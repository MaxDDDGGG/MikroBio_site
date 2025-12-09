// Simple smooth scroll to feature section
function scrollToFeatures() {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
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
window.onload = fadeOnScroll;
