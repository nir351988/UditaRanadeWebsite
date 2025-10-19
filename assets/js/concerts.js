// Concerts page specific JavaScript
// Enhanced functionality for concert listings and events

(function() {
    'use strict';

    // Concert management functionality
    const ConcertManager = {
        concerts: [],
        filters: {
            type: 'all',
            month: 'all',
            location: 'all'
        },

        init: function() {
            this.bindEvents();
            this.loadConcerts();
            this.setupFilters();
        },

        bindEvents: function() {
            // Newsletter form specific to concerts page
            const newsletterForm = document.querySelector('#newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleNewsletterSignup(newsletterForm);
                });
            }

            // Filter buttons
            document.addEventListener('click', (e) => {
                if (e.target.matches('.filter-btn')) {
                    this.handleFilterClick(e.target);
                }
            });

            // Concert card interactions
            document.addEventListener('click', (e) => {
                if (e.target.matches('.btn[href="#"]') || e.target.closest('.btn[href="#"]')) {
                    e.preventDefault();
                    this.handleTemporaryButton(e.target);
                }
            });
        },

        loadConcerts: function() {
            // This would normally load from an API or CMS
            // For now, we'll use sample data
            this.concerts = [
                {
                    id: 1,
                    title: "Classical Music Evening",
                    date: "2024-12-15",
                    time: "19:00",
                    venue: "Music Academy Mumbai",
                    location: "Mumbai",
                    type: "classical",
                    description: "An intimate evening of classical Indian music featuring traditional ragas.",
                    price: "₹500 - ₹1500",
                    status: "upcoming",
                    ticketUrl: "#",
                    image: "assets/images/concerts/classical-evening.jpg"
                },
                {
                    id: 2,
                    title: "New Year Fusion Concert",
                    date: "2024-12-31",
                    time: "20:00",
                    venue: "Cultural Center Delhi",
                    location: "Delhi",
                    type: "fusion",
                    description: "Ring in the new year with a spectacular fusion of classical and contemporary music.",
                    price: "₹800 - ₹2500",
                    status: "upcoming",
                    ticketUrl: "#",
                    image: "assets/images/concerts/fusion-concert.jpg"
                },
                {
                    id: 3,
                    title: "Contemporary Showcase",
                    date: "2025-01-20",
                    time: "18:30",
                    venue: "Arts Centre Pune",
                    location: "Pune",
                    type: "contemporary",
                    description: "A showcase of contemporary music with popular songs and original compositions.",
                    price: "₹400 - ₹1200",
                    status: "upcoming",
                    ticketUrl: "#",
                    image: "assets/images/concerts/contemporary-show.jpg"
                }
            ];

            this.renderConcerts();
        },

        renderConcerts: function() {
            const container = document.querySelector('.events-container');
            if (!container) return;

            const noEventsMessage = container.querySelector('.no-events-message');
            
            if (this.concerts.length === 0) {
                if (noEventsMessage) {
                    noEventsMessage.style.display = 'block';
                }
                return;
            }

            // Hide no events message
            if (noEventsMessage) {
                noEventsMessage.style.display = 'none';
            }

            // Clear existing events (except template and no events message)
            const existingEvents = container.querySelectorAll('.event-card:not(.template)');
            existingEvents.forEach(event => {
                if (!event.classList.contains('no-events-message')) {
                    event.remove();
                }
            });

            // Render concerts
            this.concerts.forEach(concert => {
                const eventCard = this.createEventCard(concert);
                container.appendChild(eventCard);
            });
        },

        createEventCard: function(concert) {
            const date = new Date(concert.date);
            const day = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const year = date.getFullYear();

            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <div class="date-day">${day}</div>
                    <div class="date-month">${month}</div>
                    <div class="date-year">${year}</div>
                </div>
                <div class="event-details">
                    <h3 class="event-title">${concert.title}</h3>
                    <div class="event-info">
                        <div class="event-venue">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${concert.venue}</span>
                        </div>
                        <div class="event-time">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatTime(concert.time)}</span>
                        </div>
                        <div class="event-type">
                            <i class="fas fa-music"></i>
                            <span>${this.formatType(concert.type)}</span>
                        </div>
                        <div class="event-price">
                            <i class="fas fa-ticket-alt"></i>
                            <span>${concert.price}</span>
                        </div>
                    </div>
                    <p class="event-description">${concert.description}</p>
                </div>
                <div class="event-actions">
                    <a href="${concert.ticketUrl}" class="btn btn-primary" data-concert-id="${concert.id}">
                        Get Tickets
                    </a>
                    <button class="btn btn-outline" onclick="ConcertManager.showConcertDetails(${concert.id})">
                        Learn More
                    </button>
                </div>
            `;

            // Add fade-in animation
            eventCard.style.opacity = '0';
            eventCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                eventCard.style.transition = 'all 0.5s ease';
                eventCard.style.opacity = '1';
                eventCard.style.transform = 'translateY(0)';
            }, 100);

            return eventCard;
        },

        formatTime: function(time) {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        },

        formatType: function(type) {
            const types = {
                'classical': 'Classical Recital',
                'fusion': 'Fusion Concert',
                'contemporary': 'Contemporary Show',
                'charity': 'Charity Event'
            };
            return types[type] || type;
        },

        setupFilters: function() {
            // This would set up filter UI if we had one
            // For now, we'll add filter functionality for future use
        },

        handleFilterClick: function(button) {
            const filterType = button.dataset.filter;
            const filterValue = button.dataset.value;

            if (filterType && filterValue) {
                this.filters[filterType] = filterValue;
                this.applyFilters();
                this.updateFilterUI(button);
            }
        },

        applyFilters: function() {
            // Filter concerts based on current filters
            // Implementation would depend on specific filter requirements
        },

        updateFilterUI: function(activeButton) {
            // Update filter button states
            const filterGroup = activeButton.closest('.filter-group');
            if (filterGroup) {
                const buttons = filterGroup.querySelectorAll('.filter-btn');
                buttons.forEach(btn => btn.classList.remove('active'));
                activeButton.classList.add('active');
            }
        },

        showConcertDetails: function(concertId) {
            const concert = this.concerts.find(c => c.id === concertId);
            if (!concert) return;

            // Create modal or expanded view
            this.createConcertModal(concert);
        },

        createConcertModal: function(concert) {
            // Remove existing modal
            const existingModal = document.querySelector('.concert-modal');
            if (existingModal) {
                existingModal.remove();
            }

            const modal = document.createElement('div');
            modal.className = 'concert-modal';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-body">
                        <h2>${concert.title}</h2>
                        <div class="concert-details">
                            <div class="detail-item">
                                <strong>Date:</strong> ${new Date(concert.date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </div>
                            <div class="detail-item">
                                <strong>Time:</strong> ${this.formatTime(concert.time)}
                            </div>
                            <div class="detail-item">
                                <strong>Venue:</strong> ${concert.venue}
                            </div>
                            <div class="detail-item">
                                <strong>Type:</strong> ${this.formatType(concert.type)}
                            </div>
                            <div class="detail-item">
                                <strong>Price Range:</strong> ${concert.price}
                            </div>
                        </div>
                        <p class="concert-description">${concert.description}</p>
                        <div class="modal-actions">
                            <a href="${concert.ticketUrl}" class="btn btn-primary">Get Tickets</a>
                            <button class="btn btn-outline" onclick="this.closest('.concert-modal').remove()">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            document.body.appendChild(modal);

            // Handle modal close
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
            });

            modal.querySelector('.modal-backdrop').addEventListener('click', () => {
                modal.remove();
            });

            // Handle escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);

            // Focus management
            const closeButton = modal.querySelector('.modal-close');
            closeButton.focus();
        },

        handleNewsletterSignup: function(form) {
            const email = form.querySelector('input[type="email"]').value;
            const name = form.querySelector('input[name="name"]').value;

            if (!this.validateEmail(email)) {
                this.showMessage('Please enter a valid email address', 'error', form);
                return;
            }

            // Simulate API call
            this.showLoading(form);
            
            setTimeout(() => {
                this.hideLoading(form);
                this.showMessage('Successfully subscribed! You\'ll be notified about upcoming concerts.', 'success', form);
                form.reset();
            }, 1500);
        },

        handleTemporaryButton: function(button) {
            // Handle clicks on placeholder buttons
            const buttonText = button.textContent.toLowerCase();
            
            if (buttonText.includes('ticket') || buttonText.includes('book')) {
                this.showMessage('Ticket booking will be available soon! Subscribe to get notified.', 'info');
            } else if (buttonText.includes('learn') || buttonText.includes('more')) {
                this.showMessage('More details coming soon! Stay tuned for updates.', 'info');
            }
        },

        validateEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        showLoading: function(form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            }
        },

        hideLoading: function(form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
            }
        },

        showMessage: function(message, type = 'info', container = null) {
            // Remove existing messages
            this.hideMessage(container);

            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message`;
            messageDiv.innerHTML = `
                <i class="fas ${this.getMessageIcon(type)}"></i>
                <span>${message}</span>
                <button class="message-close" aria-label="Close message">
                    <i class="fas fa-times"></i>
                </button>
            `;

            messageDiv.style.cssText = `
                background: ${this.getMessageColor(type)};
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                animation: slideIn 0.3s ease;
            `;

            if (container) {
                container.appendChild(messageDiv);
            } else {
                // Show at top of page
                document.body.insertBefore(messageDiv, document.body.firstChild);
                messageDiv.style.position = 'fixed';
                messageDiv.style.top = '1rem';
                messageDiv.style.left = '50%';
                messageDiv.style.transform = 'translateX(-50%)';
                messageDiv.style.zIndex = '1001';
            }

            // Handle close button
            messageDiv.querySelector('.message-close').addEventListener('click', () => {
                messageDiv.remove();
            });

            // Auto-hide after 5 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        },

        hideMessage: function(container) {
            const messages = container ? 
                container.querySelectorAll('.message') : 
                document.querySelectorAll('.message');
            messages.forEach(message => message.remove());
        },

        getMessageIcon: function(type) {
            const icons = {
                'success': 'fa-check-circle',
                'error': 'fa-exclamation-circle',
                'warning': 'fa-exclamation-triangle',
                'info': 'fa-info-circle'
            };
            return icons[type] || icons.info;
        },

        getMessageColor: function(type) {
            const colors = {
                'success': '#10b981',
                'error': '#ef4444',
                'warning': '#f59e0b',
                'info': '#3b82f6'
            };
            return colors[type] || colors.info;
        }
    };

    // Initialize when DOM is ready
    function initConcerts() {
        ConcertManager.init();
        
        // Add some sample concerts if in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Development mode - show sample concerts
            setTimeout(() => {
                ConcertManager.loadConcerts();
            }, 1000);
        }
    }

    // DOM ready check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConcerts);
    } else {
        initConcerts();
    }

    // Expose ConcertManager globally
    window.ConcertManager = ConcertManager;

})();