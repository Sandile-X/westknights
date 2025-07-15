// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].classList.toggle('bar1-active');
            bars[1].classList.toggle('bar2-active');
            bars[2].classList.toggle('bar3-active');
        });
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    
    if (testimonialSlider && testimonialSlides.length > 0) {
        let currentSlide = 0;
        const slideCount = testimonialSlides.length;
        
        // Show first slide initially
        testimonialSlides[0].style.display = 'block';
        
        // Hide all other slides
        for (let i = 1; i < slideCount; i++) {
            testimonialSlides[i].style.display = 'none';
        }
        
        // Previous button click event
        if (prevTestimonial) {
            prevTestimonial.addEventListener('click', function() {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slideCount - 1;
                }
                updateSlider();
            });
        }
        
        // Next button click event
        if (nextTestimonial) {
            nextTestimonial.addEventListener('click', function() {
                currentSlide++;
                if (currentSlide >= slideCount) {
                    currentSlide = 0;
                }
                updateSlider();
            });
        }
        
        // Auto slide change
        let slideInterval = setInterval(function() {
            currentSlide++;
            if (currentSlide >= slideCount) {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000);
        
        // Function to update slider
        function updateSlider() {
            for (let i = 0; i < slideCount; i++) {
                testimonialSlides[i].style.display = 'none';
            }
            testimonialSlides[currentSlide].style.display = 'block';
        }
        
        // Pause auto slide on hover
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        // Resume auto slide when mouse leaves
        testimonialSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                currentSlide++;
                if (currentSlide >= slideCount) {
                    currentSlide = 0;
                }
                updateSlider();
            }, 5000);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust offset as needed
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form Submission Handling
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const date = formData.get('date');
            const vehicle = formData.get('vehicle');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create WhatsApp message
            let whatsappMessage = `Hi Westknights Auto Repairs, I would like to book an appointment with the following details:\n\n`;
            whatsappMessage += `Name: ${name}\n`;
            whatsappMessage += `Phone: ${phone}\n`;
            whatsappMessage += `Email: ${email}\n`;
            whatsappMessage += `Preferred Date: ${date}\n`;
            whatsappMessage += `Vehicle: ${vehicle}\n`;
            whatsappMessage += `Service Required: ${service}\n`;
            if (message) {
                whatsappMessage += `Additional Information: ${message}\n`;
            }
            whatsappMessage += `\nPlease confirm my appointment. Thank you!`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/27723388192?text=${encodedMessage}`, '_blank');
            
            // Show success message
            const formContainer = this.parentElement;
            this.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Appointment Request Sent!</h3>
                <p>Your appointment details have been sent to Westknights Auto Repairs via WhatsApp. We'll contact you shortly to confirm your appointment.</p>
                <button class="btn btn-secondary" id="newAppointmentBtn">Book Another Appointment</button>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Reset form for new appointment
            document.getElementById('newAppointmentBtn').addEventListener('click', function() {
                appointmentForm.reset();
                successMessage.remove();
                appointmentForm.style.display = 'block';
            });
        });
    }
    
    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.main-nav ul li a');
    
    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }
});

// Add custom animations on scroll
window.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
});

// Add service hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-icon').style.transform = 'scale(1) rotate(0)';
        });
    });
});

// Hamburger menu animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .bar1-active {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .bar2-active {
            opacity: 0;
        }
        
        .bar3-active {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
});
