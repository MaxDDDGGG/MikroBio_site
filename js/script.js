// ================= SMOOTH SCROLL =================
function scrollToFeatures() {
    const section = document.getElementById("features");
    if(section){
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// ================= FADE-IN ANIMATION =================
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
            }
            else{
                entry.target.classList.remove('visible');
            }
        });
    },
    {
        threshold: 0.15
    }
);

fadeElements.forEach(element => {
    observer.observe(element);
});

// ================= HEADER SCROLL EFFECT =================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        header.classList.add('scrolled');
    }
    else{
        header.classList.remove('scrolled');
    }
});

// ================= MOBILE NAVIGATION =================
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if(mobileMenuButton){
    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// ================= CAROUSEL AUTO-PAUSE =================
const carousel = document.querySelector('.track');

if(carousel){
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });
}

// ================= BUTTON RIPPLE EFFECT =================
const buttons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .cta-btn-submit, .cta-btn-home'
);

buttons.forEach(button => {
    button.addEventListener('click', function(e){
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ================= PARALLAX HERO EFFECT =================
const heroImage = document.querySelector('.hero-right img');

window.addEventListener('scroll', () => {
    if(heroImage){
        const offset = window.scrollY * 0.08;
        heroImage.style.transform = `translateY(${offset}px)`;
    }
});

// ================= ENQUIRY FORM SUBMISSION & CUSTOM MODAL =================
const enquiryForm = document.getElementById('enquiryForm');
const successModal = document.getElementById('successModal');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page from redirecting
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // UI Optimization: Disable button to prevent duplicate spam clicks
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formAction = this.action;
        const formData = new FormData(this);

        // Send the data over the network to your Formspree endpoint
        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Triggers the custom animated modal window directly upon success
                if (successModal) {
                    successModal.style.display = 'flex';
                    setTimeout(() => {
                        successModal.classList.add('modal-visible');
                    }, 10);
                }
                enquiryForm.reset();
            } else {
                alert('Oops! There was a problem submitting your enquiry. Please try again.');
            }
        })
        .catch(error => {
            alert('Network error. Please check your connection and try again.');
        })
        .finally(() => {
            // Re-enable button after response cycle completes
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
}

// Helper to transition out and close modal window 
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('modal-visible');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}