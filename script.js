// ====================================
// Navigation Toggle for Mobile
// ====================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ====================================
// Active Navigation Link on Scroll
// ====================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ====================================
// Navbar Background on Scroll
// ====================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ====================================
// Smooth Scroll with Offset for Fixed Navbar
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Intersection Observer for Fade-in Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.research-item, .timeline-item, .experience-card, .publication-item, .award-card, .leadership-item, .contact-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====================================
// Add Loading Animation
// ====================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ====================================
// Dynamic Copyright Year
// ====================================

const updateYear = () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
};

updateYear();

// ====================================
// Scroll to Top Button (Optional Enhancement)
// ====================================

const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
};

createScrollToTop();

// ====================================
// Add Hover Effect to Publication Links
// ====================================

const pubLinks = document.querySelectorAll('.pub-link');
pubLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ====================================
// Email Protection (Simple obfuscation)
// ====================================

const protectEmails = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Track email clicks if analytics is needed
            console.log('Email link clicked');
        });
    });
};

protectEmails();

// ====================================
// Lazy Loading for Performance
// ====================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ====================================
// Console Easter Egg
// ====================================

console.log('%c👋 Welcome to Dr. Vikram Goel\'s Portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c🧊 Antarctic Glaciologist | Scientist at NCPOR', 'color: #3b82f6; font-size: 14px;');
console.log('%cInterested in collaboration? Reach out via the contact section!', 'color: #64748b; font-size: 12px;');

// ====================================
// Performance Monitoring
// ====================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
        }, 0);
    });
}

// ====================================
// Accessibility Enhancements
// ====================================

// Add skip to main content link
const addSkipLink = () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
};

addSkipLink();

// ====================================
// Keyboard Navigation Enhancement
// ====================================

document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ====================================
// Theme Detection (Respects user preference)
// ====================================

const respectColorScheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('User prefers dark mode - You can implement dark theme here');
        // Implement dark theme if needed
    }
};

respectColorScheme();

// Listen for changes in color scheme preference
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        respectColorScheme();
    });
}
