/**
 * Cortex VR - Core Logic
 */

export function initNavigation() {
    // Nav functional links
    document.querySelectorAll('nav a, .hero-actions a, .scroll-hint a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if (target && window.lenisInst) {
                    window.lenisInst.scrollTo(target, {
                        offset: -80, // Account for fixed header
                        duration: 1.5
                    });
                }
            }
        });
    });
}



export function initCore() {
    const loader = document.getElementById('loading');
    
    // Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });
    window.lenisInst = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        
        // Navbar scroll effect
        const nav = document.querySelector('.navbar');
        if (e.animatedScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Safety fallback
    const safetyTimeout = setTimeout(() => {
        hideLoader();
    }, 4000);

    window.addEventListener('load', () => {
        clearTimeout(safetyTimeout);
        hideLoader();
    });

    function hideLoader() {
        if (!loader || loader.style.display === 'none') return;
        
        // Disable scroll during loading
        lenis.stop();
        
        gsap.to(loader, {
            opacity: 0,
            duration: 2,
            ease: "expo.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                lenis.start(); // Enable scroll
                if (window.__initAnims) window.__initAnims();
            }
        });
    }
}
