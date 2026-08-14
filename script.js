// ================================
// Sticky Navbar
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 50);
    }
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

if ("IntersectionObserver" in window) {

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

}


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


// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
    "https://xfbwwrnsqbfumtbhyno.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_yS6FzMjvUW6sDe_gN49icQ_eKHC21Pq";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// LOAD DISHES FROM SUPABASE
// ==========================================

async function loadDishes() {

    const { data, error } = await supabaseClient
        .from("dishes")
        .select("*")
        .order("id", { ascending: true });

    if (error) {

        console.error(
            "Error loading dishes:",
            error
        );

        return;
    }

    const dishesContainer =
        document.querySelector(".dishes-container");

    if (!dishesContainer) {

        console.error(
            "dishes-container not found."
        );

        return;
    }

    // Remove old HTML dishes
    dishesContainer.innerHTML = "";

    // Create cards from Supabase
    data.forEach(dish => {

        const card =
            document.createElement("div");

        card.className = "dish-card";

        card.innerHTML = `

            <div class="dish-image">

                <i class="fa-regular fa-heart favorite"></i>

                <img
                    src="${dish.image_url}"
                    alt="${dish.name}"
                >

                <span class="price">
                    $${Number(dish.price).toFixed(2)}
                </span>

            </div>

            <div class="dish-info">

                <div class="rating">

                    <i class="fa-solid fa-star"></i>

                    ${dish.rating}

                </div>

                <h3>
                    ${dish.name}
                </h3>

                <p>
                    ${dish.description}
                </p>

                <button class="btn">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Order Now

                </button>

            </div>
        `;

        dishesContainer.appendChild(card);

    });

}


// ==========================================
// START WEBSITE
// ==========================================

loadDishes();