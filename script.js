// ====================================
// Navigation Toggle for Mobile Menu
// ====================================

const navToggle = document.getElementById('navToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuLinks = document.querySelectorAll('.menu-link');

// Open menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
}

// Close menu with close button
if (menuClose) {
    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
}

// Close menu when clicking on a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
});

// Close menu when clicking outside
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        menuOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
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
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Scroll to Top Button
// ====================================

const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTop();

// ====================================
// Page Load Animation
// ====================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ====================================
// Accessibility Enhancements
// ====================================

// Add skip to main content link
const addSkipLink = () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';

    document.body.insertBefore(skipLink, document.body.firstChild);
};

addSkipLink();

// ====================================
// Console Message
// ====================================

console.log('%c👋 Welcome to Vikram Goel\'s Portfolio!', 'color: #4A9B9B; font-size: 20px; font-weight: bold;');
console.log('%c🧊 Antarctic Glaciologist | Scientist at NCPOR', 'color: #357373; font-size: 14px;');
console.log('%cInterested in collaboration? Reach out via the contact section!', 'color: #4a4a4a; font-size: 12px;');

// ====================================
// Performance Monitoring (Development)
// ====================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
            }
        }, 0);
    });
}

// ====================================
// Lazy Loading Images (if any are added)
// ====================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ====================================
// Handle External Links
// ====================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    // Add rel attributes for security
    if (!link.rel) {
        link.rel = 'noopener noreferrer';
    }
});

// ====================================
// Email Protection
// ====================================

const protectEmails = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Could add analytics tracking here if needed
            console.log('Email link clicked:', link.href);
        });
    });
};

protectEmails();

// ====================================
// Detect Dark Mode Preference
// ====================================

const respectColorScheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('User prefers dark mode - Light theme active');
        // Could implement dark theme toggle here if desired
    }
};

respectColorScheme();

// Listen for changes in color scheme preference
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        respectColorScheme();
    });
}

// ====================================
// Handle Print Events
// ====================================

window.addEventListener('beforeprint', () => {
    console.log('Preparing page for printing...');
});

window.addEventListener('afterprint', () => {
    console.log('Print dialog closed');
});

// ====================================
// Intersection Observer for Fade-in Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for subtle fade-in
const animateElements = document.querySelectorAll('.publication, .presentation, .project, .award');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// ====================================
// Handle Focus for Accessibility
// ====================================

// Ensure focus is visible when navigating with keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
});

// ====================================
// Update Dynamic Copyright Year
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
// Service Worker Registration (Optional)
// ====================================

// Uncomment if you want to add PWA functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}
*/
