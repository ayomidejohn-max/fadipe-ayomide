/* ============================================================
   FADIPE AYOMIDE PORTFOLIO - JAVASCRIPT
   All functionality for the portfolio website
   ============================================================ */

// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickInsideHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// ==================== ACTIVE NAV LINK ====================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(
        '.project-card, .service-card, .skill-item, .testimonial-card, .stat-card'
    );
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// ==================== PORTFOLIO FILTER ====================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('fade-in');
                        }, 10);
                    } else {
                        const category = item.getAttribute('data-category');
                        if (category === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('fade-in');
                            }, 10);
                        } else {
                            item.style.display = 'none';
                            item.classList.remove('fade-in');
                        }
                    }
                });
            });
        });
    }
});

// ==================== CONTACT FORM VALIDATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form
            let isValid = true;

            // Validate name
            if (name === '' || name.length < 2) {
                showError('nameError', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }

            // Validate email
            if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            if (phone && !isValidPhone(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate subject
            if (subject === '') {
                showError('subjectError', 'Please select a subject');
                isValid = false;
            }

            // Validate message
            if (message === '' || message.length < 10) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }

            // If valid, submit form
            if (isValid) {
                submitForm(name, email, phone, subject, message);
            }
        });
    }
});

// ==================== FORM HELPER FUNCTIONS ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Accept international format
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function submitForm(name, email, phone, subject, message) {
    // Create form data
    const formData = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Log to console (for development)
    console.log('Form submitted:', formData);

    // Save to localStorage for demonstration
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Show success message
    showSuccessMessage();

    // Reset form
    document.getElementById('contactForm').reset();

    // Optional: Send email via third-party service
    // sendEmailViaAPI(formData);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// ==================== COUNTER ANIMATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    statCards.forEach(card => {
        const finalValue = parseInt(card.textContent);
        
        if (isNaN(finalValue)) {
            // Handle non-numeric values like "100%"
            const numericValue = parseInt(card.textContent.match(/\d+/)[0]);
            animateCounter(card, numericValue, card.textContent.replace(/\d+/, ''));
        } else {
            animateCounter(card, finalValue, '');
        }
    });
});

function animateCounter(element, finalValue, suffix) {
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50);
    const originalText = element.textContent;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = originalText;
            clearInterval(counter);
        } else {
            element.textContent = currentValue + suffix;
        }
    }, 30);
}

// ==================== SCROLL REVEAL FOR HERO ====================
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        const scrollY = window.scrollY;
        heroContent.style.opacity = Math.max(1 - scrollY / 500, 0);
        heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ==================== LAZY LOADING IMAGES ====================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => img.classList.add('loaded'));
    }
});

// ==================== COPY TO CLIPBOARD ====================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('Copied to clipboard!');
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-in-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Alt + C to scroll to contact
    if (e.altKey && e.key === 'c') {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Alt + H to go home
    if (e.altKey && e.key === 'h') {
        window.location.href = 'index.html';
    }
});

// ==================== SCROLL TO TOP BUTTON ====================
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll to top button hover effect
    scrollTopBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#007bff';
        this.style.transform = 'scale(1)';
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ==================== PREVENT SPAM SUBMISSIONS ====================
const submissionLimiter = {
    lastSubmissionTime: 0,
    minInterval: 3000, // 3 seconds minimum between submissions

    canSubmit: function() {
        const now = Date.now();
        if (now - this.lastSubmissionTime > this.minInterval) {
            this.lastSubmissionTime = now;
            return true;
        }
        return false;
    }
};

// Override form submit to use limiter
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const originalSubmit = contactForm.onsubmit;
        contactForm.addEventListener('submit', function(e) {
            if (!submissionLimiter.canSubmit()) {
                e.preventDefault();
                showNotification('Please wait before submitting again', 'error');
            }
        });
    }
});

// ==================== SERVICE WORKER (PWA) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('Service Worker registered:', registration);
        // });
    });
}

// ==================== PERFORMANCE MONITORING ====================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        }, 0);
    });
}

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add skip to main content link
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ==================== ARIA LABELS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Add aria labels to icon buttons
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const title = link.getAttribute('title');
        if (title) {
            link.setAttribute('aria-label', title);
        }
    });
});

// ==================== SMOOTH PAGE TRANSITIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a:not([target="_blank"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for anchor links
            if (href && href.startsWith('#')) {
                return;
            }
            
            // Check if it's an internal link
            if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                e.preventDefault();
                
                // Add fade out animation
                document.body.style.opacity = '0.7';
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        });
    });
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c👨‍💻 Welcome to Fadipe Ayomide\'s Portfolio!', 'font-size: 20px; color: #007bff; font-weight: bold;');
console.log('%cLooking for a web developer? Get in touch! 🚀', 'font-size: 16px; color: #28a745;');
console.log('%cEmail: fadipeayomide17@gmail.com | WhatsApp: +2349033212713', 'font-size: 14px; color: #666;');