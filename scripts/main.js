// Main JavaScript for Dazzlo Enterprises Website

class DazzloWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupServiceCards();
        this.setupTestimonialsSlider();
        this.setupContactForm();
        this.setupParallaxEffects();
        this.setupPageTransitions();
    }

    setupNavigation() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('bg-opacity-90', 'backdrop-blur-md');
            } else {
                nav.classList.remove('bg-opacity-90', 'backdrop-blur-md');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                mobileMenuBtn.classList.toggle('active');
            });

            // Close menu when clicking on links
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    mobileMenuBtn.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }
    }

    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                serviceCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                card.classList.add('active');
                
                // Animate content reveal
                const content = card.querySelector('.service-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    setupTestimonialsSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;

        if (testimonials.length > 0) {
            const showTestimonial = (index) => {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
                    testimonial.style.opacity = i === index ? '1' : '0';
                });
            };

            // Auto-advance testimonials
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            }, 5000);

            // Initial display
            showTestimonial(0);
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Show success message (in real implementation, this would send to backend)
                this.showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                contactForm.reset();
            });
        }
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupPageTransitions() {
        // Add loading animation to page
        document.body.classList.add('loading');
        
        // Remove loading class after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 500);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Utility function to format phone numbers
    formatPhoneNumber(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    // Utility function to validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DazzloWebsite();
});

// Add smooth scrolling to the whole page
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading state to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Add intersection observer for lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
} 