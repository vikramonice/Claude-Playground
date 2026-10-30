/*
 * Booking PDF parser for the travel page.
 *
 * Works on the text of an e-ticket (Balmer Lawrie / MOCORE style, and similar
 * agency tickets). Text is rebuilt into lines from pdf.js items, then parsed
 * with regular expressions. Runs in the browser and in Node (for testing).
 */
(function (root) {
  'use strict';

  const MONTHS = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
  const DT_RE = /(\d{1,2}):(\d{2})\s+(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/g;

  // Group pdf.js text items into lines (same y), ordered left to right.
  function itemsToLines(items) {
    const rows = [];
    items.forEach(it => {
      if (!it.str || !it.str.trim()) return;
      const x = it.transform[4], y = it.transform[5];
      let row = rows.find(r => Math.abs(r.y - y) < 2.5);
      if (!row) { row = { y, parts: [] }; rows.push(row); }
      row.parts.push({ x, s: it.str });
    });
    rows.sort((a, b) => b.y - a.y);
    return rows.map(r => r.parts.sort((a, b) => a.x - b.x).map(p => p.s.trim()).join('   ')).join('\n');
  }

  // Extract text from a PDF ArrayBuffer using a pdf.js instance.
  async function pdfToText(pdfjsLib, data) {
    const doc = await pdfjsLib.getDocument({ data }).promise;
    const pages = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      pages.push(itemsToLines(content.items));
    }
    return pages.join('\n');
  }

  function clean(text) {
    return text.replace(/­/g, '-').replace(/[‐-―]/g, '-').replace(/\r/g, '');
  }

  function pick(text, re) {
    const m = text.match(re);
    return m ? m[1].trim() : '';
  }

  function toIso(m) {
    const mon = MONTHS[m[4].toUpperCase()];
    const pad = n => String(n).padStart(2, '0');
    return `${m[5]}-${pad(mon)}-${pad(m[3])}T${pad(m[1])}:${m[2]}`;
  }

  function parseSegment(seg) {
    const times = [...seg.matchAll(DT_RE)];
    // Airports are written as "Name, City (XXX)"; carrier codes are 2 chars, cabin codes 1 char.
    const airportRe = /([A-Za-z][^()\n]*?)\s*\(([A-Z]{3})\)/g;
    const airports = [...seg.matchAll(airportRe)].map(m => ({
      code: m[2],
      name: m[1].replace(/.*\s{3,}/, '').replace(/^[-\s]+/, '').trim()
    }));
    if (times.length < 2 || airports.length < 2) return null;

    const carrierM = seg.match(/([A-Za-z][A-Za-z .&'-]*?)\s*\(([A-Z0-9]{2})\)\s*-?\s*([A-Za-z ]+?)\s*\(([A-Z])\)/);
    // Flight number: the leftover standalone number once times, durations and terminals are removed.
    const stripped = seg.replace(DT_RE, ' ').replace(/\d+\s*H\s*:\s*\d+\s*M/gi, ' ')
      .replace(/Terminal(\s+[A-Z]?\d+[A-Z]?)?/g, ' ').replace(/\([A-Z0-9]{1,3}\)/g, ' ');
    const numM = stripped.match(/(?:^|\s)(\d{1,4})(?=\s|$)/m);
    const terms = [...seg.matchAll(/Terminal(?:[ \t]+([A-Z]?\d+[A-Z]?)\b)?/g)].map(m => m[1] || '');

    const carrierCode = carrierM ? carrierM[2] : '';
    const number = numM ? numM[1] : '';
    return {
      airline: carrierM ? carrierM[1].trim() : '',
      carrier: carrierCode,
      number,
      flight: carrierCode + number,
      cabin: carrierM ? `${carrierM[3].trim()} (${carrierM[4]})` : '',
      from: airports[0].code, fromName: airports[0].name,
      to: airports[1].code, toName: airports[1].name,
      dep: toIso(times[0]), arr: toIso(times[1]),
      depTerminal: terms[0] || '', arrTerminal: terms[1] || ''
    };
  }

  function parseBooking(rawText) {
    const text = clean(rawText);
    if (text.replace(/©.*|\s/g, '').length < 50) {
      throw new Error('this PDF has no readable text (it is a scanned or image-only file). Use the travel agency e-ticket instead.');
    }
    const booking = {
      reference: pick(text, /Reference ID\s*:\s*([A-Z0-9]+)/i),
      gdsPnr: pick(text, /GDS PNR\s*:\s*([A-Z0-9]+)/i),
      status: pick(text, /Status\s*:\s*([A-Z]+)/),
      tripType: pick(text, /Trip Type\s*:\s*([A-Za-z ]+?)(?:\s{2,}|\(|$)/m),
      sector: pick(text, /Sector Name\s*:\s*(.+?)(?:\s{3,}|Stops|$)/m),
      bookedOn: pick(text, /Transaction Date\s*:\s*([\d-]+)/i).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3'),
      client: pick(text, /Client Name\s*:\s*([^\n]+)/i).replace(/\s{2,}.*/, ''),
      total: pick(text, /Grand Total\s+([\d,.]+)/i),
      passengers: [],
      flights: []
    };

    // Passengers: one row each in "Traveller Details".
    const travIdx = text.search(/Traveller Details/i);
    const flightIdx = text.search(/Flight Details/i);
    const travText = travIdx >= 0 ? text.slice(travIdx, flightIdx > travIdx ? flightIdx : undefined) : text;
    const paxRe = /^\s*((?:MR|MRS|MS|MISS|MSTR|DR|PROF)\.?\s+[A-Z][A-Z .'-]+?)\s{2,}(ADT|CHD|INF|ADULT|CHILD)\b(.*)$/gm;
    for (const m of travText.matchAll(paxRe)) {
      const rest = m[3];
      booking.passengers.push({
        name: m[1].replace(/\s+/g, ' ').trim(),
        type: m[2],
        ticket: pick(rest, /\b(\d{13})\b/),
        airlinePnr: pick(rest, /\b\d{13}\b\s+([A-Z0-9]{5,7})\b/),
        bag: pick(rest, /(\d+\s*(?:Piece\(s\)|PC|Kg|KG|kg)s?)/)
      });
    }

    // Flights: split the Flight Details block on "Change of Planes".
    const end = text.search(/Fare Details|Rules and Conditions/i);
    const flText = flightIdx >= 0 ? text.slice(flightIdx, end > flightIdx ? end : undefined) : text;
    flText.split(/Change of Planes/i).forEach(seg => {
      const f = parseSegment(seg);
      if (f) booking.flights.push(f);
    });

    if (!booking.flights.length) throw new Error('No flights found in this PDF. Is it an e-ticket?');
    const first = booking.flights[0], last = booking.flights[booking.flights.length - 1];
    booking.id = (booking.reference || booking.gdsPnr || first.flight) + '-' + first.dep.slice(0, 10);
    booking.title = `${first.from} to ${last.to}`;
    return booking;
  }

  const api = { itemsToLines, pdfToText, parseBooking };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BookingParser = api;
})(this);
