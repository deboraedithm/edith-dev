document.addEventListener("DOMContentLoaded", function() {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    const header = document.querySelector('.header');
    const headerRevealZone = document.querySelector('.header-reveal-zone');
    let headerHideTimer;

    const revealHeader = () => {
        window.clearTimeout(headerHideTimer);
        document.body.classList.add('header-revealed');
    };

    const scheduleHeaderHide = (delay) => {
        window.clearTimeout(headerHideTimer);
        headerHideTimer = window.setTimeout(() => {
            document.body.classList.remove('header-revealed');
        }, delay);
    };

    if (header && headerRevealZone && window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) {
        headerRevealZone.addEventListener('pointerenter', revealHeader);
        headerRevealZone.addEventListener('pointerleave', () => scheduleHeaderHide(1800));
        header.addEventListener('pointerenter', revealHeader);
        header.addEventListener('pointerleave', () => scheduleHeaderHide(350));
    }

    const mobileProjectQuery = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const projectToggles = document.querySelectorAll('.project-details-toggle');
    const resetProjectDetails = () => {
        projectToggles.forEach((toggle) => {
            const details = document.getElementById(toggle.getAttribute('aria-controls'));
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace(/^(Show|Hide)/, 'Show'));
            toggle.closest('.project-card').classList.remove('details-open');
            if (mobileProjectQuery.matches) {
                details.setAttribute('aria-hidden', 'true');
            } else {
                details.removeAttribute('aria-hidden');
            }
        });
    };

    resetProjectDetails();
    mobileProjectQuery.addEventListener('change', resetProjectDetails);

    projectToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            if (!mobileProjectQuery.matches) return;

            const card = toggle.closest('.project-card');
            const details = document.getElementById(toggle.getAttribute('aria-controls'));
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            projectToggles.forEach((openToggle) => {
                if (openToggle === toggle || openToggle.getAttribute('aria-expanded') !== 'true') return;

                openToggle.setAttribute('aria-expanded', 'false');
                openToggle.setAttribute('aria-label', openToggle.getAttribute('aria-label').replace(/^Hide/, 'Show'));
                openToggle.closest('.project-card').classList.remove('details-open');
                document.getElementById(openToggle.getAttribute('aria-controls')).setAttribute('aria-hidden', 'true');
            });

            toggle.setAttribute('aria-expanded', String(!isExpanded));
            toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace(isExpanded ? /^Hide/ : /^Show/, isExpanded ? 'Show' : 'Hide'));
            card.classList.toggle('details-open', !isExpanded);
            details.setAttribute('aria-hidden', String(isExpanded));
        });
    });

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
    const heroTitle = document.querySelector('.hero-title');
    let typingStarted = false;
    const heroText = "Developer by day. Player by nature.";

    const startTyping = () => {
        if (typingStarted || !heroTitle || prefersReducedMotion) return;
        typingStarted = true;
        heroTitle.textContent = '';

        let characterIndex = 0;
        const typeNextCharacter = () => {
            characterIndex += 1;
            heroTitle.textContent = heroText.slice(0, characterIndex);

            if (characterIndex < heroText.length) {
                window.setTimeout(typeNextCharacter, 45);
            }
        };

        window.setTimeout(typeNextCharacter, 400);
    };

    const heroObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            startTyping();
        }
    }, {
        threshold: 0.1
    });
    
    if (heroSection && !prefersReducedMotion) {
        heroObserver.observe(heroSection);

        if (window.matchMedia('(pointer: fine)').matches) {
            document.addEventListener('pointermove', (event) => {
                document.body.style.setProperty('--page-pointer-x', `${event.clientX}px`);
                document.body.style.setProperty('--page-pointer-y', `${event.clientY}px`);
            });

            heroSection.addEventListener('pointermove', (event) => {
                const bounds = heroSection.getBoundingClientRect();
                heroSection.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
                heroSection.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
            });
        }
    }

    const scrollProgress = document.querySelector('.scroll-progress');
    let scrollTicking = false;

    const updateScrollProgress = () => {
        if (!scrollProgress) return;

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        scrollProgress.style.transform = `scaleX(${progress})`;
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateScrollProgress);
            scrollTicking = true;
        }
    }, { passive: true });
    updateScrollProgress();
    window.addEventListener('resize', updateScrollProgress);

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealItems = document.querySelectorAll('.section-title, .about-container, .project-card, .contact-subtitle, .contact-button');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => {
            item.classList.add('reveal-ready');
            revealObserver.observe(item);
        });
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
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
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
