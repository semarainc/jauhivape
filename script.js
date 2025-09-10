// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initTabs();
    initAnimations();
    initForms();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(this);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active link based on scroll position
    window.addEventListener('scroll', function() {
        updateActiveNavOnScroll();
        updateNavbarBackground();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active link manually
function updateActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Update navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .symptom-card, .food-item, .habit-card, .lifestyle-card, .tip-card, .recipe-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Tab functionality for food groups and food guide
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add animation to food items (for food groups section)
            const foodItems = document.querySelectorAll(`#${targetTab} .food-item`);
            foodItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Add animation to food tables (for food guide section)
            const foodTables = document.querySelectorAll(`#${targetTab} .food-table`);
            foodTables.forEach(table => {
                table.style.opacity = '0';
                table.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    table.style.opacity = '1';
                    table.style.transform = 'translateY(0)';
                }, 200);
            });
        });
    });
}

// Enhanced animations
function initAnimations() {
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
    });
    
    // Counter animation for stats
    animateCounters();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + index * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Form handling
function initForms() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
    
    // Recipe buttons
    const recipeButtons = document.querySelectorAll('.recipe-btn');
    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            showRecipeModal(this);
        });
    });
}

// Handle contact form submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Mengirim...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Handle newsletter form submission
function handleNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button');
    
    if (!emailInput.value) {
        showNotification('Mohon masukkan alamat email yang valid.', 'error');
        return;
    }
    
    // Show loading state
    const originalHTML = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
        emailInput.value = '';
        
        // Reset button
        submitButton.innerHTML = originalHTML;
        submitButton.disabled = false;
    }, 1500);
}

// Show recipe modal (simplified version)
function showRecipeModal(button) {
    const recipeCard = button.closest('.recipe-card');
    const recipeTitle = recipeCard.querySelector('h3').textContent;
    
    // Create simple modal content
    const modalContent = `
        <div class="recipe-modal-overlay" onclick="closeRecipeModal()">
            <div class="recipe-modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>${recipeTitle}</h3>
                    <button class="close-btn" onclick="closeRecipeModal()">&times;</button>
                </div>
                <div class="modal-content">
                    <h4>Bahan-bahan:</h4>
                    <ul>
                        <li>Bahan 1 - sesuai kebutuhan</li>
                        <li>Bahan 2 - sesuai kebutuhan</li>
                        <li>Bahan 3 - sesuai kebutuhan</li>
                    </ul>
                    <h4>Cara Membuat:</h4>
                    <ol>
                        <li>Langkah pertama dalam pembuatan</li>
                        <li>Langkah kedua dalam pembuatan</li>
                        <li>Langkah ketiga dalam pembuatan</li>
                        <li>Sajikan dan nikmati!</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Add modal styles
    addModalStyles();
}

// Close recipe modal
function closeRecipeModal() {
    const modal = document.querySelector('.recipe-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Add modal styles dynamically
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = `
        <style id="modal-styles">
            .recipe-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .recipe-modal {
                background: white;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                border-radius: 20px;
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #2C3E50;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #6C757D;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: #f8f9fa;
                color: #2C3E50;
            }
            
            .modal-content {
                padding: 2rem;
            }
            
            .modal-content h4 {
                color: #4CAF50;
                margin-bottom: 1rem;
                margin-top: 1.5rem;
            }
            
            .modal-content h4:first-child {
                margin-top: 0;
            }
            
            .modal-content ul,
            .modal-content ol {
                padding-left: 1.5rem;
            }
            
            .modal-content li {
                margin-bottom: 0.5rem;
                line-height: 1.6;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    addNotificationStyles();
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification styles
function addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;
    
    const styles = `
        <style id="notification-styles">
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
                font-weight: 500;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-error {
                background: #E74C3C;
            }
            
            .notification-success {
                background: #4CAF50;
            }
            
            .notification-info {
                background: #3498DB;
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add scroll event listener with debounce
window.addEventListener('scroll', debounce(revealOnScroll, 10));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeRecipeModal();
    }
    
    // Navigate with arrow keys (optional enhancement)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentSection = getCurrentSection();
        const sections = ['home', 'about-vape', 'myths-facts', 'dangers', 'why-teens', 'tips'];
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % sections.length;
        } else {
            nextIndex = (currentIndex - 1 + sections.length) % sections.length;
        }
        
        const nextSection = document.getElementById(sections[nextIndex]);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// Performance optimization: Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Console welcome message
console.log('%c🚭 Jauhi Vape Website', 'color: #E74C3C; font-size: 20px; font-weight: bold;');
console.log('%cWebsite ini dibuat dengan ❤️ untuk edukasi bahaya vape pada remaja', 'color: #6C757D; font-size: 14px;');
