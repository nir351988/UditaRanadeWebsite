// Smooth Scroll Implementation for Udita Ranade Website
// Enhanced with accessibility and performance optimizations

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        DURATION: 800,
        EASING: 'easeInOutCubic',
        OFFSET: 80, // Default offset for fixed navbar
        FOCUS_AFTER_SCROLL: true
    };

    // Easing functions
    const easingFunctions = {
        linear: function(t) {
            return t;
        },
        easeInQuad: function(t) {
            return t * t;
        },
        easeOutQuad: function(t) {
            return t * (2 - t);
        },
        easeInOutQuad: function(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic: function(t) {
            return t * t * t;
        },
        easeOutCubic: function(t) {
            return (--t) * t * t + 1;
        },
        easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart: function(t) {
            return t * t * t * t;
        },
        easeOutQuart: function(t) {
            return 1 - (--t) * t * t * t;
        },
        easeInOutQuart: function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        }
    };

    // Smooth scroll class
    class SmoothScroll {
        constructor(options = {}) {
            this.options = {
                ...CONFIG,
                ...options
            };
            
            this.isScrolling = false;
            this.animationId = null;
            this.startPosition = 0;
            this.targetPosition = 0;
            this.startTime = null;
            
            this.init();
        }

        init() {
            this.bindEvents();
            this.setupReducedMotionSupport();
        }

        bindEvents() {
            // Handle anchor links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (!link) return;

                const href = link.getAttribute('href');
                if (!href || href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                this.scrollToElement(target, {
                    offset: this.getOffset(link),
                    callback: () => this.handleScrollComplete(target, link)
                });
            });

            // Handle back/forward browser buttons
            window.addEventListener('popstate', () => {
                if (location.hash) {
                    const target = document.querySelector(location.hash);
                    if (target) {
                        setTimeout(() => {
                            this.scrollToElement(target, { updateHistory: false });
                        }, 100);
                    }
                }
            });

            // Cancel scrolling on user interaction
            this.bindCancelEvents();
        }

        bindCancelEvents() {
            const cancelEvents = ['wheel', 'touchstart', 'keydown'];
            
            cancelEvents.forEach(event => {
                document.addEventListener(event, (e) => {
                    if (this.isScrolling) {
                        // Allow scrolling with specific keys
                        if (event === 'keydown') {
                            const allowedKeys = ['Tab', 'Shift', 'Alt', 'Control', 'Meta'];
                            if (allowedKeys.includes(e.key)) return;
                        }
                        
                        this.cancelScroll();
                    }
                }, { passive: true });
            });
        }

        setupReducedMotionSupport() {
            // Check for reduced motion preference
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            // Listen for changes in motion preference
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
                mediaQuery.addListener((mq) => {
                    this.prefersReducedMotion = mq.matches;
                });
            }
        }

        getOffset(link) {
            // Get custom offset from data attribute
            const customOffset = link.getAttribute('data-scroll-offset');
            if (customOffset !== null) {
                return parseInt(customOffset, 10);
            }

            // Calculate navbar height
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            return this.options.OFFSET || navbarHeight;
        }

        scrollToElement(target, options = {}) {
            if (!target) return;

            const settings = {
                offset: this.options.OFFSET,
                duration: this.options.DURATION,
                easing: this.options.EASING,
                updateHistory: true,
                callback: null,
                ...options
            };

            // If reduced motion is preferred, scroll instantly
            if (this.prefersReducedMotion) {
                this.scrollInstantly(target, settings.offset);
                if (settings.callback) settings.callback();
                return;
            }

            this.cancelScroll();

            this.startPosition = window.pageYOffset;
            this.targetPosition = this.getTargetPosition(target, settings.offset);
            
            // If already at target position, don't animate
            if (Math.abs(this.targetPosition - this.startPosition) < 1) {
                if (settings.callback) settings.callback();
                return;
            }

            this.startTime = null;
            this.isScrolling = true;
            this.currentSettings = settings;

            // Update URL hash if needed
            if (settings.updateHistory && target.id) {
                this.updateHistory(target.id);
            }

            // Start animation
            this.animationId = requestAnimationFrame((timestamp) => {
                this.animate(timestamp);
            });
        }

        scrollInstantly(target, offset) {
            const targetPosition = this.getTargetPosition(target, offset);
            window.scrollTo(0, targetPosition);
        }

        getTargetPosition(target, offset) {
            const rect = target.getBoundingClientRect();
            const targetPosition = rect.top + window.pageYOffset - offset;
            
            // Ensure we don't scroll past the document
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            return Math.max(0, Math.min(targetPosition, maxScroll));
        }

        animate(timestamp) {
            if (!this.startTime) this.startTime = timestamp;
            
            const elapsed = timestamp - this.startTime;
            const progress = Math.min(elapsed / this.currentSettings.duration, 1);
            
            // Apply easing function
            const easingFunction = easingFunctions[this.currentSettings.easing] || easingFunctions.easeInOutCubic;
            const easedProgress = easingFunction(progress);
            
            // Calculate current position
            const currentPosition = this.startPosition + (this.targetPosition - this.startPosition) * easedProgress;
            
            // Scroll to current position
            window.scrollTo(0, currentPosition);
            
            // Continue animation or complete
            if (progress < 1) {
                this.animationId = requestAnimationFrame((timestamp) => {
                    this.animate(timestamp);
                });
            } else {
                this.completeScroll();
            }
        }

        completeScroll() {
            this.isScrolling = false;
            this.animationId = null;
            
            // Ensure we're exactly at target position
            window.scrollTo(0, this.targetPosition);
            
            // Execute callback
            if (this.currentSettings && this.currentSettings.callback) {
                this.currentSettings.callback();
            }
        }

        cancelScroll() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            this.isScrolling = false;
        }

        updateHistory(targetId) {
            try {
                const newUrl = window.location.pathname + window.location.search + '#' + targetId;
                history.pushState(null, '', newUrl);
            } catch (error) {
                console.warn('Could not update browser history:', error);
            }
        }

        handleScrollComplete(target, triggerElement) {
            // Focus management for accessibility
            if (this.options.FOCUS_AFTER_SCROLL) {
                this.manageFocus(target, triggerElement);
            }

            // Announce to screen readers
            this.announceScrollComplete(target);
        }

        manageFocus(target, triggerElement) {
            // Store the element that triggered the scroll
            this.lastFocusedElement = triggerElement;

            // Focus the target if it's focusable, otherwise focus the first focusable child
            if (target.tabIndex >= 0 || target.matches('a, button, input, textarea, select')) {
                target.focus();
            } else {
                const focusableChild = target.querySelector('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
                if (focusableChild) {
                    focusableChild.focus();
                } else {
                    // Make target focusable temporarily for screen readers
                    target.tabIndex = -1;
                    target.focus();
                    target.style.outline = 'none';
                }
            }
        }

        announceScrollComplete(target) {
            // Create a temporary element to announce the scroll completion
            const announcement = document.createElement('div');
            announcement.textContent = `Scrolled to ${target.textContent || target.id || 'section'}`;
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.style.width = '1px';
            announcement.style.height = '1px';
            announcement.style.overflow = 'hidden';

            document.body.appendChild(announcement);

            // Remove after announcement
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }

        // Public API methods
        scrollTo(target, options = {}) {
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            if (element) {
                this.scrollToElement(element, options);
            }
        }

        scrollToTop(options = {}) {
            const settings = {
                duration: this.options.DURATION / 2, // Faster for top
                easing: this.options.EASING,
                ...options
            };

            if (this.prefersReducedMotion) {
                window.scrollTo(0, 0);
                return;
            }

            this.cancelScroll();

            this.startPosition = window.pageYOffset;
            this.targetPosition = 0;
            this.startTime = null;
            this.isScrolling = true;
            this.currentSettings = settings;

            this.animationId = requestAnimationFrame((timestamp) => {
                this.animate(timestamp);
            });
        }

        destroy() {
            this.cancelScroll();
            // Remove event listeners if needed
        }
    }

    // Initialize smooth scroll when DOM is ready
    function initSmoothScroll() {
        // Check if smooth scrolling is already supported natively
        if ('scrollBehavior' in document.documentElement.style) {
            // Use native smooth scrolling for simple cases
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // But still initialize our enhanced version for complex scenarios
            window.smoothScroll = new SmoothScroll();
        } else {
            // Use our polyfill for older browsers
            window.smoothScroll = new SmoothScroll();
        }

        // Add scroll to top functionality
        addScrollToTopButton();
    }

    // Add scroll to top button
    function addScrollToTopButton() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(scrollToTopBtn);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'flex';
                scrollToTopBtn.style.alignItems = 'center';
                scrollToTopBtn.style.justifyContent = 'center';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Handle click
        scrollToTopBtn.addEventListener('click', () => {
            if (window.smoothScroll) {
                window.smoothScroll.scrollToTop();
            } else {
                window.scrollTo(0, 0);
            }
        });

        // Hover effects
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-3px)';
            scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothScroll);
    } else {
        initSmoothScroll();
    }

    // Expose SmoothScroll class for external use
    window.SmoothScroll = SmoothScroll;

})();