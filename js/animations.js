/**
 * GSAP Entrance Animations
 */

export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Entrance with smooth reveal
    tl.from('.navbar', {
        y: -40,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    })
        .from('.reveal-text', {
            y: 60,
            opacity: 0,
            duration: 2,
            ease: "expo.out"
        }, "-=1")
        .from('.sub-headline', {
            opacity: 0,
            y: 30,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.5")
        .from('.hero-actions', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1.2")
        .from('.hero-bottom', {
            opacity: 0,
            y: 40,
            duration: 1.8,
            ease: "expo.out"
        }, "-=1.5");

    // PARALLAX:
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        opacity: 0,
        ease: 'none'
    });

    gsap.to('.hero-bottom', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        },
        ease: 'none'
    });


    // PARALLAX: Background deepens
    gsap.to('#cortex-canvas-container', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        scale: 1.2,
        ease: 'none'
    });

    // Scroll reveal for details
    gsap.from('.tabs-container', {
        scrollTrigger: {
            trigger: '.details-section',
            start: "top 85%",
        },
        opacity: 0,
        y: 100,
        duration: 2,
        ease: "expo.out"
    });
    // Card Reveal Animations
    const cards = document.querySelectorAll('.featured-card');
    cards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "expo.out"
        });
    });

    const smallCards = document.querySelectorAll('.small-card');
    smallCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 30,
            x: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "expo.out"
        });
    });
}
