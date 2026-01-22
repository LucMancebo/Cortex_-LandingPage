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
                        duration: 2.5, // Mais suave e cinematográfico
                        easing: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1) // easeInOutCubic
                    });
                }
            }
        });
    });
}



export function initCore() {
    const loader = document.getElementById('loading');

    // Initialize Smooth Scroll (Lenis) - Enhanced smooth parameters
    const lenis = new Lenis({
        duration: 1.6, // Aumentado para scroll mais suave
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo suave
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8, // Reduzido para scroll mais controlado
        smoothTouch: false,
        touchMultiplier: 1.5, // Ajustado para mobile
        infinite: false,
        syncTouch: true, // Melhor sincronização no touch
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
            duration: 1.5, // Mais rápido para entrar no conteúdo
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                lenis.start(); // Enable scroll
                if (window.__initAnims) window.__initAnims();
            }
        });
    }
}

export function initApplications() {
    const cards = document.querySelectorAll('.app-item-card');
    const video = document.getElementById('app-video-preview');
    const container = document.querySelector('.app-media-container');
    const source = video ? video.querySelector('source') : null;

    if (!cards.length || !video || !source) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) return;

            // Update active class
            // Advanced Media Transition Protocol
            const nextVideo = card.getAttribute('data-video');
            const tl = gsap.timeline();

            // Phase 0: Update active class & animate card
            tl.to(cards, {
                x: 0,
                opacity: 0.7,
                filter: "grayscale(0.5)",
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    cards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                }
            })
                .to(card, {
                    x: 15,
                    opacity: 1,
                    filter: "grayscale(0)",
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }, "-=0.1")

            // Phase 1: Exit Animation
            tl.to(video, {
                opacity: 0,
                scale: 1.05,
                filter: "blur(10px)",
                duration: 0.4,
                ease: "power2.inOut"
            })
                .to(container, {
                    scale: 0.98,
                    duration: 0.3,
                    ease: "power2.inOut"
                }, "-=0.2")

                // Phase 2: Content Swap
                .add(() => {
                    source.setAttribute('src', nextVideo);
                    video.load();
                    video.play();
                })

                // Phase 3: Entrance Animation
                .to(container, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out"
                })
                .to(video, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.4");
        });
    });
}
