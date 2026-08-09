// ================================
// Sticky Navbar
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
});


// ================================
// Active Navigation
// ================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ================================
// Back To Top Button
// ================================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ================================
// Scroll Animation
// ================================

const cards = document.querySelectorAll(
    ".dish-card, .testimonial-card, .gallery-item"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

cards.forEach(card => observer.observe(card));


// ================================
// Mobile Menu
// ================================

const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {

    menuIcon.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            menuIcon.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuIcon.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });


    // Close menu after clicking a navigation link

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuIcon.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}