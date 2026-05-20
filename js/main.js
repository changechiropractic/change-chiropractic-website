document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Replace your existing contactForm.addEventListener block with this:
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the page from refreshing

        // Get the form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const messageInput = document.getElementById('message').value;
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Indicate sending state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send form data to formsubmit.co "behind the scenes"
        fetch("https://formsubmit.co/ajax/admin@changechiropractic.ie", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: messageInput,
                _subject: "New Website Contact Form Submission" // Subject line of the email
            })
        })
        .then(response => response.json())
        .then(data => {
            // Show a success message
            formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            // Clear the form inputs
            contactForm.reset();
        })
        .catch(error => {
            // Show error message
            formMessage.textContent = `Oops! There was an error sending your message.`;
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        })
        .finally(() => {
            // Reset the button text
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            // Hide the message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message'; 
            }, 5000);
        });
    });
}

    // --- FAQ Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Check if the summary element or its children were clicked
            const summary = item.querySelector('summary');
            if (summary && summary.contains(event.target)) {
                // If this item is about to be opened
                if (!item.hasAttribute('open')) {
                    // Close all other details tags
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.hasAttribute('open')) {
                            otherItem.removeAttribute('open');
                        }


                    });
                }
            }
        });
    });
// --- Testimonial Carousel Logic ---
    const scripts_testimonials = document.querySelectorAll('.carousel-track .testimonial-card');
    const scripts_dots = document.querySelectorAll('.carousel-indicators .dot');
    const scripts_prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const scripts_nextBtn = document.querySelector('.carousel-btn.next-btn');

    if (scripts_testimonials.length > 0) {
        let currentSlideIndex = 0;

        function showSlide(index) {
            // Handle wrap-around
            if (index >= scripts_testimonials.length) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = scripts_testimonials.length - 1;
            } else {
                currentSlideIndex = index;
            }

            // Update cards
            scripts_testimonials.forEach((card, idx) => {
                if (idx === currentSlideIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });

            // Update dots
            if (scripts_dots.length > 0) {
                scripts_dots.forEach((dot, idx) => {
                    if (idx === currentSlideIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        if (scripts_prevBtn) {
            scripts_prevBtn.addEventListener('click', () => {
                showSlide(currentSlideIndex - 1);
            });
        }

        if (scripts_nextBtn) {
            scripts_nextBtn.addEventListener('click', () => {
                showSlide(currentSlideIndex + 1);
            });
        }

        if (scripts_dots.length > 0) {
            scripts_dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
    }
});