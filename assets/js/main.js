// Main JavaScript for Udita Ranade Website
// Enhanced with error handling and accessibility features

(function() {
    'use strict';

    // Global variables and configuration
    const CONFIG = {
        SCROLL_THRESHOLD: 100,
        ANIMATION_DURATION: 300,
        DEBOUNCE_DELAY: 100,
        API_TIMEOUT: 5000
    };

    // Utility functions
    const utils = {
        // Debounce function for performance optimization
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction() {
                const context = this;
                const args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        // Throttle function for scroll events
        throttle: function(func, limit) {
            let lastFunc;
            let lastRan;
            return function() {
                const context = this;
                const args = arguments;
                if (!lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(function() {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        },

        // Safe element selector with error handling
        safeQuerySelector: function(selector, parent = document) {
            try {
                return parent.querySelector(selector);
            } catch (error) {
                console.warn(`Invalid selector: ${selector}`, error);
                return null;
            }
        },

        // Safe element selectors (multiple) with error handling
        safeQuerySelectorAll: function(selector, parent = document) {
            try {
                return parent.querySelectorAll(selector);
            } catch (error) {
                console.warn(`Invalid selector: ${selector}`, error);
                return [];
            }
        },

        // Add class with error handling
        addClass: function(element, className) {
            if (element && typeof element.classList !== 'undefined') {
                element.classList.add(className);
            }
        },

        // Remove class with error handling
        removeClass: function(element, className) {
            if (element && typeof element.classList !== 'undefined') {
                element.classList.remove(className);
            }
        },

        // Toggle class with error handling
        toggleClass: function(element, className) {
            if (element && typeof element.classList !== 'undefined') {
                element.classList.toggle(className);
            }
        },

        // Check if element has class
        hasClass: function(element, className) {
            if (element && typeof element.classList !== 'undefined') {
                return element.classList.contains(className);
            }
            return false;
        },

        // Smooth scroll to element
        smoothScrollTo: function(target, offset = 0) {
            if (!target) return;
            
            const targetPosition = target.offsetTop - offset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        },

        // Show loading state
        showLoading: function(element) {
            if (element) {
                this.addClass(element, 'loading');
                element.disabled = true;
            }
        },

        // Hide loading state
        hideLoading: function(element) {
            if (element) {
                this.removeClass(element, 'loading');
                element.disabled = false;
            }
        },

        // Show error message
        showError: function(message, container) {
            this.hideError(container);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.setAttribute('role', 'alert');
            
            if (container) {
                container.appendChild(errorDiv);
            } else {
                document.body.appendChild(errorDiv);
            }
            
            // Auto-hide after 5 seconds
            setTimeout(() => this.hideError(container), 5000);
        },

        // Hide error message
        hideError: function(container) {
            const errorMessages = this.safeQuerySelectorAll('.error-message', container || document);
            errorMessages.forEach(error => error.remove());
        },

        // Show success message
        showSuccess: function(message, container) {
            this.hideSuccess(container);
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = message;
            successDiv.setAttribute('role', 'alert');
            
            if (container) {
                container.appendChild(successDiv);
            } else {
                document.body.appendChild(successDiv);
            }
            
            // Auto-hide after 5 seconds
            setTimeout(() => this.hideSuccess(container), 5000);
        },

        // Hide success message
        hideSuccess: function(container) {
            const successMessages = this.safeQuerySelectorAll('.success-message', container || document);
            successMessages.forEach(success => success.remove());
        }
    };

    // Navigation functionality
    const navigation = {
        init: function() {
            this.bindEvents();
            this.handleScroll();
        },

        bindEvents: function() {
            const hamburger = utils.safeQuerySelector('.hamburger');
            const navMenu = utils.safeQuerySelector('.nav-menu');
            const navLinks = utils.safeQuerySelectorAll('.nav-link');

            // Hamburger menu toggle
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMobileMenu(hamburger, navMenu);
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                        this.closeMobileMenu(hamburger, navMenu);
                    }
                });
            }

            // Close menu when clicking nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (hamburger && navMenu) {
                        this.closeMobileMenu(hamburger, navMenu);
                    }
                });
            });

            // Scroll event for navbar
            window.addEventListener('scroll', utils.throttle(() => {
                this.handleScroll();
            }, 10));

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && hamburger && navMenu) {
                    this.closeMobileMenu(hamburger, navMenu);
                }
            });
        },

        toggleMobileMenu: function(hamburger, navMenu) {
            utils.toggleClass(hamburger, 'active');
            utils.toggleClass(navMenu, 'active');
            
            // Update ARIA attributes
            const isActive = utils.hasClass(navMenu, 'active');
            hamburger.setAttribute('aria-expanded', isActive);
            navMenu.setAttribute('aria-hidden', !isActive);
        },

        closeMobileMenu: function(hamburger, navMenu) {
            utils.removeClass(hamburger, 'active');
            utils.removeClass(navMenu, 'active');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        },

        handleScroll: function() {
            const navbar = utils.safeQuerySelector('.navbar');
            if (!navbar) return;

            if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
                utils.addClass(navbar, 'scrolled');
            } else {
                utils.removeClass(navbar, 'scrolled');
            }
        }
    };

    // Form handling
    const forms = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            // Contact form
            const contactForm = utils.safeQuerySelector('#contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleContactForm(contactForm);
                });
            }

            // Newsletter form
            const newsletterForm = utils.safeQuerySelector('#newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleNewsletterForm(newsletterForm);
                });
            }

            // Form validation on input
            const formInputs = utils.safeQuerySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        },

        validateField: function(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            // Required field validation
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            }

            // Email validation
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }

            // Phone validation (if applicable)
            if (field.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }

            this.displayFieldValidation(field, isValid, errorMessage);
            return isValid;
        },

        displayFieldValidation: function(field, isValid, errorMessage) {
            this.clearFieldError(field);

            if (!isValid) {
                utils.addClass(field, 'error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.textContent = errorMessage;
                errorDiv.setAttribute('role', 'alert');
                field.parentNode.appendChild(errorDiv);
            } else {
                utils.removeClass(field, 'error');
            }
        },

        clearFieldError: function(field) {
            utils.removeClass(field, 'error');
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        },

        validateForm: function(form) {
            const fields = form.querySelectorAll('input[required], textarea[required]');
            let isFormValid = true;

            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isFormValid = false;
                }
            });

            return isFormValid;
        },

        handleContactForm: function(form) {
            if (!this.validateForm(form)) {
                utils.showError('Please correct the errors above', form);
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            utils.showLoading(submitButton);
            utils.hideError(form);

            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                utils.hideLoading(submitButton);
                utils.showSuccess('Thank you for your message! I\'ll get back to you soon.', form);
                form.reset();
            }, 2000);
        },

        handleNewsletterForm: function(form) {
            if (!this.validateForm(form)) {
                utils.showError('Please provide valid information', form);
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            utils.showLoading(submitButton);
            utils.hideError(form);

            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                utils.hideLoading(submitButton);
                utils.showSuccess('Successfully subscribed to the newsletter!', form);
                form.reset();
            }, 1500);
        }
    };

    // Smooth scrolling for anchor links
    const smoothScroll = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            const scrollLinks = utils.safeQuerySelectorAll('a[href^="#"]');
            
            scrollLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#' || href === '#!') return;
                    
                    e.preventDefault();
                    const target = utils.safeQuerySelector(href);
                    if (target) {
                        const navbarHeight = utils.safeQuerySelector('.navbar')?.offsetHeight || 0;
                        utils.smoothScrollTo(target, navbarHeight + 20);
                    }
                });
            });
        }
    };

    // Image lazy loading and error handling
    const imageHandler = {
        init: function() {
            this.setupLazyLoading();
            this.handleImageErrors();
        },

        setupLazyLoading: function() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            utils.removeClass(img, 'lazy');
                            observer.unobserve(img);
                        }
                    });
                });

                const lazyImages = utils.safeQuerySelectorAll('img[loading="lazy"]');
                lazyImages.forEach(img => {
                    utils.addClass(img, 'lazy');
                    imageObserver.observe(img);
                });
            }
        },

        handleImageErrors: function() {
            const images = utils.safeQuerySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', () => {
                    if (!img.hasAttribute('data-error-handled')) {
                        img.setAttribute('data-error-handled', 'true');
                        this.setFallbackImage(img);
                    }
                });
            });
        },

        setFallbackImage: function(img) {
            const fallbacks = {
                'portrait': 'assets/images/placeholder-portrait.jpg',
                'landscape': 'assets/images/placeholder-landscape.jpg',
                'square': 'assets/images/placeholder-square.jpg'
            };

            // Determine image type based on alt text or context
            const alt = img.alt.toLowerCase();
            let fallbackType = 'landscape'; // default

            if (alt.includes('portrait') || img.closest('.about-image')) {
                fallbackType = 'portrait';
            } else if (alt.includes('logo') || img.closest('.nav-logo')) {
                fallbackType = 'square';
            }

            img.src = fallbacks[fallbackType];
            img.alt = 'Image not available';
        }
    };

    // Accessibility enhancements
    const accessibility = {
        init: function() {
            this.setupKeyboardNavigation();
            this.setupFocusManagement();
            this.setupScreenReaderSupport();
        },

        setupKeyboardNavigation: function() {
            // Skip to main content link
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-link sr-only';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);

            skipLink.addEventListener('focus', () => {
                utils.removeClass(skipLink, 'sr-only');
            });

            skipLink.addEventListener('blur', () => {
                utils.addClass(skipLink, 'sr-only');
            });
        },

        setupFocusManagement: function() {
            // Focus trap for mobile menu
            const navMenu = utils.safeQuerySelector('.nav-menu');
            if (navMenu) {
                navMenu.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        this.handleTabNavigation(e, navMenu);
                    }
                });
            }
        },

        handleTabNavigation: function(e, container) {
            const focusableElements = container.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        },

        setupScreenReaderSupport: function() {
            // Add live region for dynamic content updates
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.id = 'live-region';
            document.body.appendChild(liveRegion);
        },

        announceToScreenReader: function(message) {
            const liveRegion = utils.safeQuerySelector('#live-region');
            if (liveRegion) {
                liveRegion.textContent = message;
            }
        }
    };

    // Performance monitoring
    const performance = {
        init: function() {
            this.monitorPageLoad();
            this.setupErrorHandling();
        },

        monitorPageLoad: function() {
            window.addEventListener('load', () => {
                if ('performance' in window) {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    console.log(`Page loaded in ${loadTime}ms`);
                }
            });
        },

        setupErrorHandling: function() {
            window.addEventListener('error', (e) => {
                console.error('JavaScript error:', e.error);
                // Could send to analytics service here
            });

            window.addEventListener('unhandledrejection', (e) => {
                console.error('Unhandled promise rejection:', e.reason);
                // Could send to analytics service here
            });
        }
    };

    // Initialize everything when DOM is ready
    function init() {
        try {
            navigation.init();
            forms.init();
            smoothScroll.init();
            imageHandler.init();
            accessibility.init();
            performance.init();

            // Announce page ready to screen readers
            setTimeout(() => {
                accessibility.announceToScreenReader('Page loaded successfully');
            }, 1000);

        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // DOM ready check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utilities for global use
    window.UditaWebsite = {
        utils: utils,
        navigation: navigation,
        forms: forms,
        accessibility: accessibility
    };

})();