document.addEventListener("DOMContentLoaded", function() {

    const heroSection = document.querySelector('.hero');
    let typedInstance = null;

    const typedOptions = {
        strings: ["FullStack Developer crafting intuitive and powerful digital experiences."],
        typeSpeed: 50,
        startDelay: 500,
        showCursor: false,
        cursorChar: '|',
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

});

const copyEmailBtn = document.getElementById('copyEmailBtn');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'deboraedithm@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = 'Email Copied!';
                
                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                }, 2000); 

            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }