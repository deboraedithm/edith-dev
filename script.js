// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Theme Toggling
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply the appropriate theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Theme toggle function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Add click event listeners to theme toggles
  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);
  
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
  
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  mobileMenuButton.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  
// Close menu when clicking on nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
// Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        event.target !== mobileMenuButton) {
      closeMobileMenu();
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add animations on scroll
  const animateElements = document.querySelectorAll('.section, .card, .section-title, .section-description', '.button', 'header','hero', 'hero-button');
  
  function checkIfInView() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      } 
      else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
      }
    });
  }
  
  // Set initial styles for animation
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
  
  window.addEventListener('scroll', checkIfInView);

    checkIfInView();
  });

// Open the modal
function abrirModal() {
  const modal = document.getElementById('meuModal');
  const body = document.body;
  
  modal.style.display = 'block';
  body.classList.add('modal-open');
}

// Close the modal
function fecharModal() {
  const modal = document.getElementById('meuModal');
  const body = document.body;
  
  modal.style.display = 'none';
  body.classList.remove('modal-open');
}

// Opcional: Close the modal, clicking outside of it
window.addEventListener('click', function(event) {
  const modal = document.getElementById('meuModal');
  if (event.target === modal) {
      fecharModal();
  }
});
function toggleDarkTheme() {
  document.body.classList.toggle('dark-theme');
}

// Video playback speed control
const video = document.getElementById('meuVideo');
video.playbackRate = 1.5;

// Back to Top Button
const backToTopButton = document.querySelector('#back-to-top');
  
window.addEventListener('scroll', () =>{
  if (window.pageYOffset > 100){
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
  backToTopButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
})
console.log(backToTopButton);
