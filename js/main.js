document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setMenuState = (isOpen) => {
        if (!mobileBtn || !navLinks) return;

        mobileBtn.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
        mobileBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    };
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileBtn.getAttribute('aria-expanded') === 'true';
            setMenuState(!isOpen);
        });

        navItems.forEach((item) => {
            item.addEventListener('click', () => setMenuState(false));
        });
    }

    // Navbar Scrolled State
    const navbar = document.getElementById('navbar');
    const updateNavbarHeight = () => {
        if (!navbar) return;

        document.documentElement.style.setProperty('--navbar-height', `${navbar.getBoundingClientRect().height}px`);
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const canUseGsap = !prefersReducedMotion && window.gsap && window.ScrollTrigger;

    if (canUseGsap) {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".navbar", { y: -100, opacity: 0, duration: 0.8 })
          .from(".hero-content .greeting", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".hero-content h1", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-content .description", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-content .cta-group", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-visual", {
              x: 50,
              opacity: 0,
              duration: 1
          }, "-=0.8");

        // Scroll Animations
        const revealElements = document.querySelectorAll('.gs_reveal');
        
        revealElements.forEach((elem) => {
            let x = 0;
            let y = 50;

            if (elem.classList.contains('gs_reveal_fromRight')) {
                x = 50;
                y = 0;
            } else if (elem.classList.contains('gs_reveal_fromLeft')) {
                x = -50;
                y = 0;
            }

            gsap.fromTo(elem,
                { x: x, y: y, autoAlpha: 0 },
                {
                    duration: 1,
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // Project Card Accordion
    const expandBtns = document.querySelectorAll('.btn-expand');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!isExpanded));
        });
    });

});
