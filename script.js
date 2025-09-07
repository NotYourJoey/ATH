// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
};

// Close mobile menu when clicking on a link
const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
};

// Event Listeners
hamburger.addEventListener('click', toggleMobileMenu);
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileMenu();
        
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        console.log('Clicked link:', targetId, 'Target found:', !!target);
        
        if (target) {
            // Use native smooth scrolling as fallback
            const offsetTop = target.offsetTop - 80;
            console.log('Scrolling to:', offsetTop);
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            console.error('Target not found for:', targetId);
        }
    });
});

// Smooth scrolling function
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.backgroundColor = 'rgba(248, 248, 240, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--off-white)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// GSAP Animations
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupFloatingElements();
        this.setupBenefitCards();
        this.setupContactForm();
    }

    setupScrollAnimations() {
        // Hero section animations
        gsap.from('.hero-content', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.hero-visual', {
            duration: 1.5,
            x: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });

        // Hero image animation
        gsap.from('.hero-image', {
            duration: 1.8,
            scale: 1.1,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.8
        });

        gsap.from('.image-overlay', {
            duration: 1.2,
            opacity: 0,
            ease: 'power2.out',
            delay: 1.2
        });

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            });
        });

        // About section
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power2.out'
        });

        gsap.from('.ingredients-showcase', {
            scrollTrigger: {
                trigger: '.ingredients-showcase',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power2.out'
        });

        // Contact section
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power2.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power2.out'
        });
    }

    setupHeroAnimations() {
        // Hero image entrance animation is handled in setupScrollAnimations
    }

    setupFloatingElements() {
        // Animate bubbles entrance
        gsap.utils.toArray('.bubble').forEach((bubble, index) => {
            gsap.from(bubble, {
                duration: 1,
                scale: 0,
                opacity: 0,
                ease: 'back.out(1.7)',
                delay: 1.5 + (index * 0.1)
            });

            // Continuous floating animation
            gsap.to(bubble, {
                y: -30,
                duration: 4 + (index * 0.5),
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1,
                delay: index * 0.2
            });

            // Interactive hover effect
            bubble.addEventListener('mouseenter', () => {
                gsap.to(bubble, {
                    duration: 0.3,
                    scale: 1.3,
                    ease: 'power2.out'
                });
            });

            bubble.addEventListener('mouseleave', () => {
                gsap.to(bubble, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupBenefitCards() {
        // Set initial state for benefit cards
        gsap.set('.benefit-card', {
            opacity: 1,
            y: 0
        });

        // Stagger animation for benefit cards
        gsap.from('.benefit-card', {
            scrollTrigger: {
                trigger: '.benefits-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: () => {
                // Ensure cards are visible after animation
                gsap.set('.benefit-card', { opacity: 1, y: 0 });
            }
        });

        // Fallback: If ScrollTrigger fails, show cards after a delay
        setTimeout(() => {
            const benefitCards = document.querySelectorAll('.benefit-card');
            benefitCards.forEach((card, index) => {
                if (card.style.opacity === '0' || getComputedStyle(card).opacity === '0') {
                    gsap.to(card, {
                        duration: 0.5,
                        opacity: 1,
                        y: 0,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }, 2000);

        // Hover animations for benefit cards
        document.querySelectorAll('.benefit-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupContactForm() {
        // Form input focus animations
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    duration: 0.3,
                    scale: 1.02,
                    ease: 'power2.out'
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Hello! I'm ${name} and I'm interested in TWI HEMAAH'S Herbal Soap.\n\n${message}\n\nPhone: ${phone}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/233596603849?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success animation
        this.showSuccessAnimation();
        
        // Reset form
        this.form.reset();
    }

    showSuccessAnimation() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#25d366';
        
        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 1.1,
            ease: 'back.out(1.7)',
            yoyo: true,
            repeat: 1
        });
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupIngredientHover();
        this.setupSocialLinks();
        this.setupScrollToTop();
    }

    setupIngredientHover() {
        document.querySelectorAll('.ingredient').forEach(ingredient => {
            ingredient.addEventListener('mouseenter', () => {
                gsap.to(ingredient, {
                    duration: 0.3,
                    scale: 1.2,
                    rotation: 10,
                    ease: 'power2.out'
                });
            });

            ingredient.addEventListener('mouseleave', () => {
                gsap.to(ingredient, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupSocialLinks() {
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1.2,
                    rotation: 5,
                    ease: 'power2.out'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--olive-green);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: 0 },
                ease: 'power2.inOut'
            });
        });
        
        // Hover animation
        scrollToTopBtn.addEventListener('mouseenter', () => {
            gsap.to(scrollToTopBtn, {
                duration: 0.3,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        scrollToTopBtn.addEventListener('mouseleave', () => {
            gsap.to(scrollToTopBtn, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    }
}

// Parallax Effect
class ParallaxController {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallaxElements();
    }

    setupParallaxElements() {
        // Parallax for hero image
        gsap.to('.hero-image', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            scale: 1.05,
            ease: 'none'
        });

        // Parallax for bubbles
        gsap.utils.toArray('.bubble').forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -80,
                ease: 'none'
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupIntersectionObserver();
    }

    setupLazyLoading() {
        // Lazy load images if any are added later
        const images = document.querySelectorAll('img[data-src]');
        
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

        images.forEach(img => imageObserver.observe(img));
    }

    setupIntersectionObserver() {
        // Optimize animations with Intersection Observer
        const animatedElements = document.querySelectorAll('.benefit-card, .feature, .contact-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new ContactFormHandler();
    new InteractiveElements();
    new ParallaxController();
    new PerformanceOptimizer();
    
    // Add loading animation
    gsap.from('body', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out'
    });
    
    // Debug: Check if navigation links are working
    console.log('Navigation links found:', navLinks.length);
    navLinks.forEach((link, index) => {
        console.log(`Link ${index + 1}:`, link.href, link.textContent);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
});

// Additional smooth scrolling for any other anchor links (like buttons)
document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
