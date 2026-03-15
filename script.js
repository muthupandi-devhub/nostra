// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    
    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Open sidebar when menu toggle is clicked
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }
    
    // Close sidebar when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when a link is clicked
    const sidebarLinks = document.querySelectorAll('.sidebar-list ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Set active link based on current page
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.sidebar-list ul li a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || 
            (currentPath.endsWith('/') && href === '#')) {
            link.parentElement.classList.add('active');
        }
    });
});

// Hero Slider JavaScript
let currentSlide = 0;
const slides = document.querySelectorAll('.hero__section__img .slider');
const totalSlides = slides.length;

// Function to show current slide
function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Show current slide
    slides[currentSlide].style.display = 'block';
}

// Next slide function
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide function
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto slide (optional)
function startAutoSlide() {
    setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        showSlide(0);
        // Uncomment to enable auto-slide
        // startAutoSlide();
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.hero__section__img');

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe right - previous slide
            prevSlide();
        } else {
            // Swipe left - next slide
            nextSlide();
        }
    }
}