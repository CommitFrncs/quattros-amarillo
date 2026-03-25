// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.padding = "0.5rem 0";
    } else {
        navbar.style.padding = "1rem 0";
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
// Active State for Sticky Action Bar
// Detects current page and highlights the corresponding button

function setActiveStickyButton() {
    const currentPath = window.location.pathname;
    const callBtn = document.getElementById('callBtn');
    const menuBtn = document.getElementById('menuBtn');
    const directionsBtn = document.getElementById('directionsBtn');
    
    // Remove active class from all buttons first
    if (callBtn) callBtn.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
    if (directionsBtn) directionsBtn.classList.remove('active');
    
    // Check which page we're on and add active class
    if (currentPath.includes('menu.html') || currentPath === '/menu.html') {
        // On Menu page - highlight Menu button
        if (menuBtn) menuBtn.classList.add('active');
    } else if (currentPath.includes('tel:') || currentPath === '/call') {
        // On Call page (if you have one)
        if (callBtn) callBtn.classList.add('active');
    } else {
        // Default: On Home page or Directions page
        // Check if we're on directions (external link doesn't count)
        // Home page - no button is highlighted by default
        // Or you can highlight Call button on home page
        if (!currentPath.includes('menu.html')) {
            // On home page, you might want to highlight nothing
            // Or highlight call button - your choice
            // Uncomment below if you want call button highlighted on home:
            // if (callBtn) callBtn.classList.add('active');
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', setActiveStickyButton);

// Also run when navigating (for SPA-like behavior, though not needed for standard pages)
window.addEventListener('pageshow', setActiveStickyButton);