document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Navbar Scrolled State
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".navbar", { y: -100, opacity: 0, duration: 0.8 })
      .from(".hero-content .greeting", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".hero-content h1 span", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.6")
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

    // Project Card Accordion
    const expandBtns = document.querySelectorAll('.btn-expand');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
        });
    });

});
