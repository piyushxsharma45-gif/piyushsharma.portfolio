// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavbar();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initScrollProgress();
    initSmoothScrolling();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        // Scroll effect for navbar
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Active nav link highlighting
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Add animation classes and observe elements
        const animatedElements = document.querySelectorAll('.service-card, .result-card, .about-text, .contact-info, .contact-form');
        
        animatedElements.forEach((element, index) => {
            if (index % 2 === 0) {
                element.classList.add('fade-in');
            } else {
                element.classList.add('slide-in-left');
            }
            observer.observe(element);
        });
        
        // Special animations for hero elements
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Skill bars animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.dataset.skill;
                    entry.target.style.width = skillLevel + '%';
                }
            });
        });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    // Contact form handling
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Create email body
            const emailBody = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service: ${data.service}
Message: ${data.message}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:piyushxsharma45@gmail.com?subject=New Business Inquiry from ${data.name}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Thank you for your message! Your email client will open shortly.', 'success');
            
            // Reset form
            contactForm.reset();
        });
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearErrors(this);
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            
            // Remove existing error styles
            field.classList.remove('error');
            
            if (field.hasAttribute('required') && !value) {
                isValid = false;
            }
            
            if (field.type === 'email' && value && !isValidEmail(value)) {
                isValid = false;
            }
            
            if (field.type === 'tel' && value && !isValidPhone(value)) {
                isValid = false;
            }
            
            if (!isValid) {
                field.classList.add('error');
            }
            
            return isValid;
        }
        
        function clearErrors(field) {
            field.classList.remove('error');
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function isValidPhone(phone) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            return phoneRegex.test(phone);
        }
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#6366f1',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Typing animation for hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing animation when hero is in view
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 30);
                }, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroTitle);
    
    // Add custom cursor effect
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        Object.assign(cursor.style, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            background: 'rgba(99, 102, 241, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '10000',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease'
        });
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .result-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(99, 102, 241, 0.2)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(99, 102, 241, 0.5)';
            });
        });
    }
    
    // Initialize custom cursor on desktop only
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
    
    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3, .result-metric h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    }
    
    animateCounters();
    
    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        Object.assign(loader.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10001',
            transition: 'opacity 0.5s ease'
        });
        
        const loaderContent = loader.querySelector('.loader-content');
        Object.assign(loaderContent.style, {
            textAlign: 'center',
            color: '#6366f1'
        });
        
        const spinner = loader.querySelector('.loader-spinner');
        Object.assign(spinner.style, {
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
        });
        
        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(() => {
        if ('performance' in window && 'timing' in window.performance) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    }, 0);
});

// Add form field error styles
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);