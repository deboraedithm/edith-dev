document.addEventListener("DOMContentLoaded", function() {

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'ph ph-moon'; 
        } else {
            themeIcon.className = 'ph ph-sun'; 
        }
    }

    const heroSection = document.querySelector('.hero');
    let typedInstance = null;

    const typedOptions = {
        strings: ["FullStack Developer crafting intuitive and powerful digital experiences."],
        typeSpeed: 50,
        startDelay: 500,
        showCursor: false,
        loop: false,
    };

    const startTyping = () => {
        if (typedInstance) {
            typedInstance.destroy();
        }
        typedInstance = new Typed('.hero-title', typedOptions);
    };

    const heroObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            startTyping();
        }
    }, {
        threshold: 0.5
    });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }


    // --- BOTÃO DE VOLTAR AO TOPO ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { 
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }

    const copyEmailBtn = document.getElementById('copyEmailBtn');

    if (copyEmailBtn) {
        const originalText = copyEmailBtn.innerHTML;

        copyEmailBtn.addEventListener('click', () => {
            const email = 'deboraedithm@gmail.com'; 
            
            if (copyEmailBtn.classList.contains('copied')) {
                return; 
            }

            navigator.clipboard.writeText(email).then(() => {
                copyEmailBtn.classList.add('copied');
                copyEmailBtn.innerHTML = `<i class="ph ph-check-circle"></i> Email Copied!`;
                
                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied'); 
                    copyEmailBtn.innerHTML = originalText;
                }, 2500); 

            }).catch(err => {
                console.error('Failed to copy email: ', err);
                copyEmailBtn.innerHTML = 'Error!';
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                }, 2500);
            });
        });
    }
});
