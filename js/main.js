/**
 * SMCTechLabs Website - Main JavaScript
 * Handles navigation, animations, and user interactions
 */

// ===================================
// Global Variables
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const policyAppToggles = document.querySelectorAll('.policy-app-toggle');
const policyAppPanels = document.querySelectorAll('.policy-app-panel');
const policySidebarLinks = document.querySelectorAll('.policy-subnav a');
const productSliderTrack = document.getElementById('productSliderTrack');
const productSlides = document.querySelectorAll('.product-slide');
const productPrev = document.getElementById('productPrev');
const productNext = document.getElementById('productNext');
const productSliderDots = document.getElementById('productSliderDots');
let activeProductSlide = 0;

// ===================================
// Mobile Navigation Toggle
// ===================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Event listener for hamburger button
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// ===================================
// Apps Privacy Policy Sidebar
// ===================================
function getPolicyAppFromHash(hash) {
    if (!hash) {
        return null;
    }

    if (hash.startsWith('#tv-remote')) {
        return 'tv-remote';
    }

    if (hash.startsWith('#litelist')) {
        return 'litelist';
    }

    if (hash.startsWith('#rulr')) {
        return 'rulr';
    }

    return null;
}

function setActivePolicyApp(appId) {
    if (!appId || !policyAppPanels.length) {
        return;
    }

    policyAppPanels.forEach(panel => {
        panel.hidden = panel.dataset.policyApp !== appId;
    });

    policyAppToggles.forEach(toggle => {
        const subnavId = toggle.getAttribute('aria-controls');
        const subnav = document.getElementById(subnavId);
        const appGroup = toggle.closest('.policy-app-group');
        const isActive = subnavId === `${appId}-subnav`;

        toggle.setAttribute('aria-expanded', String(isActive));

        if (subnav) {
            subnav.hidden = !isActive;
        }

        if (appGroup) {
            appGroup.classList.toggle('is-open', isActive);
        }
    });
}

function scrollToPolicyTarget(hash) {
    if (!hash || hash === '#') {
        return;
    }

    const target = document.querySelector(hash);

    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

policyAppToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const subnavId = toggle.getAttribute('aria-controls');
        const appId = subnavId ? subnavId.replace('-subnav', '') : null;

        if (appId) {
            setActivePolicyApp(appId);
            scrollToPolicyTarget(`#${appId}`);
        }
    });
});

policySidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        setActivePolicyApp(getPolicyAppFromHash(link.getAttribute('href')));
    });
});

if (policyAppPanels.length) {
    setActivePolicyApp(getPolicyAppFromHash(window.location.hash) || 'tv-remote');

    if (window.location.hash) {
        window.requestAnimationFrame(() => scrollToPolicyTarget(window.location.hash));
    }
}

window.addEventListener('hashchange', () => {
    setActivePolicyApp(getPolicyAppFromHash(window.location.hash));
    scrollToPolicyTarget(window.location.hash);
});

// ===================================
// Products Slider
// ===================================
function updateProductSlider() {
    if (!productSliderTrack || !productSlides.length) {
        return;
    }

    productSliderTrack.style.transform = `translateX(-${activeProductSlide * 100}%)`;

    productSlides.forEach((slide, index) => {
        const isHidden = index !== activeProductSlide;
        slide.setAttribute('aria-hidden', String(isHidden));
        slide.querySelectorAll('a, button').forEach(interactiveElement => {
            interactiveElement.tabIndex = isHidden ? -1 : 0;
        });
    });

    if (productSliderDots) {
        productSliderDots.querySelectorAll('.product-slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeProductSlide);
            dot.setAttribute('aria-current', index === activeProductSlide ? 'true' : 'false');
        });
    }
}

function setProductSlide(index) {
    if (!productSlides.length) {
        return;
    }

    activeProductSlide = (index + productSlides.length) % productSlides.length;
    updateProductSlider();
}

if (productSliderTrack && productSlides.length && productSliderDots) {
    productSlides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.className = 'product-slider-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show ${slide.getAttribute('aria-label') || `product ${index + 1}`}`);
        dot.addEventListener('click', () => setProductSlide(index));
        productSliderDots.appendChild(dot);
    });

    if (productPrev) {
        productPrev.addEventListener('click', () => setProductSlide(activeProductSlide - 1));
    }

    if (productNext) {
        productNext.addEventListener('click', () => setProductSlide(activeProductSlide + 1));
    }

    updateProductSlider();
}

// ===================================
// Close Mobile Menu on Link Click
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// ===================================
// Close Mobile Menu on Outside Click
// ===================================
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMobileMenu();
    }
});

// ===================================
// Header Scroll Effect
// ===================================
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        handleHeaderScroll();
        updateActiveNavLink();
    });
});

// ===================================
// Active Navigation Link Based on Scroll
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${sectionId}`);

            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form Handling
// ===================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form data
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
        // In production, you would send this data to your server
        console.log('Form submitted:', formData);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #27ae60;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-success i {
            color: #27ae60;
        }
        
        .notification-error i {
            color: #e74c3c;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #6c757d;
            padding: 0.25rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    // Append to body
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', '');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-card, .product-slider');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ===================================
// Handle Window Resize
// ===================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250);
});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on ESC key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===================================
// Performance: Lazy Loading Images
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('load', () => {
    // Initial header state
    handleHeaderScroll();
    updateActiveNavLink();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ===================================
// Console Message
// ===================================
console.log('%c👋 Welcome to SMCTechLabs!', 'font-size: 20px; font-weight: bold; color: #F4D03F;');
console.log('%cInterested in our code? Visit our website or contact us!', 'font-size: 14px; color: #6c757d;');
