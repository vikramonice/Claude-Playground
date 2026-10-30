# Flight Tracker (`travel/`)

A one-page flight status board, served by GitHub Pages at `/travel/`.

- **Next flight** with a live countdown, terminal and schedule-based status (Scheduled, Check-in open, Boarding soon, In the air, Landed).
- **Itinerary** with every leg in local airport time, connection times (tight connections under 1 hour are flagged) and codeshare hints.
- **Live status** buttons per flight: Flightradar24, FlightAware, Google.
- **Local time now** at every airport on the trip.

## Adding a new booking

Tap **Upload booking PDF** and pick the e-ticket. The PDF is parsed in the browser
(pdf.js + `parser.js`) and saved in that device's browser storage only. Nothing is uploaded.

To make a trip appear on every device, click **Download trip data (for the site)** and add the
object to the array in `trips.json`. The download leaves out PNRs, ticket numbers and fares,
because this repository and its Pages site are public.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The page (UI, time-zone maths, upload handling) |
| `parser.js` | E-ticket text parser (Balmer Lawrie / MOCORE layout; works in browser and Node) |
| `trips.json` | Trips shown on every device (no PNRs or ticket numbers) |

If a new airport shows a "time zone unknown" warning, add it to the `AIRPORTS` table in `index.html`.
