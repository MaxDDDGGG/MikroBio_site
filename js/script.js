// script.js

function scrollToFeatures() {
    const features = document.getElementById("features");
    if (features) {
        features.scrollIntoView({ behavior: "smooth" });
    }
}

// Fade elements into view
const elements = document.querySelectorAll('.fade-in');

function fadeOnScroll() {
    elements.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", fadeOnScroll);
window.addEventListener("load", fadeOnScroll);

// ----- Enquiry form -----
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm && window.emailjs) {
    enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        emailjs.send("service_55kgdsb", "template_f7oiwse", {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
        })
        .then(() => {
            alert('Thank you for your enquiry! We will get back to you soon.');
            this.reset();
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong. Please try again.');
        });
    });
}
