'use strict';

// --- Theme Switcher ---
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

// Apply saved theme on page load
if(darkmode === "active") enableDarkmode();

// Toggle theme on button click
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// Header transparency effect on scroll
const header = document.querySelector('header');
const updateHeaderOpacity = () => {
    if (window.scrollY > 50) {
        header.style.background = darkmode === "active" 
            ? 'rgba(22, 16, 25, 0.95)' 
            : 'rgba(191, 171, 204, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = darkmode === "active" 
            ? 'rgba(22, 16, 25, 0.8)' 
            : 'rgba(191, 171, 204, 0.8)';
        header.style.boxShadow = 'none';
    }
};

// Add scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveDot();
    updateHeaderOpacity();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveDot();
    updateHeaderOpacity();
    
    // Simple animation for main content
    const textContent = document.querySelector('.text-content');
    const profileImage = document.querySelector('.profile-image');
    
    setTimeout(() => {
        if (textContent) textContent.style.opacity = 1;
        if (profileImage) profileImage.style.opacity = 1;
    }, 300);
});

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.text-container', {
        loop: true,
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 900,

        breakpoints: {
            640: {
                slidesPerView: 1, 
            },
            768: {
                slidesPerView: 1, 
            },
            1024: {
                slidesPerView: 1,
            },
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            dynamicBullets: true,
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    const hoverImages = document.querySelectorAll('.hover-sound');

    hoverImages.forEach(image => {
    
        const soundId = image.getAttribute('data-sound');
        const audioElement = document.getElementById(soundId);

        audioElement.volume = 0.2;

        image.addEventListener('mouseover', function() {
            
            audioElement.currentTime = 0;
            audioElement.play();
        });
    });
});

// --- Back to top function ---
const toTop = document.querySelector('#backtotop');

window.addEventListener('scroll', () =>{
    if (window.pageYOffset > 300){
        toTop.classList.add('active');
    } else {
        toTop.classList.remove('active');
    }
    toTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})