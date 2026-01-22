/**
 * GSAP Entrance Animations - SEM mudanças de opacidade
 */

export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Configure ScrollTrigger defaults for smoother animations
  ScrollTrigger.defaults({
    ease: "power2.out",
    duration: 1.2,
  });

  const tl = gsap.timeline();

  // Enhanced cinematic entrance - Mais rápido e dinâmico
  tl.from(".navbar", {
    y: -60,
    duration: 0.8, // Mais rápido
    ease: "power3.out",
  })
    .from(
      ".reveal-text",
      {
        y: 60, // Menos movimento
        scale: 0.9,
        duration: 1, // Mais rápido
        ease: "power3.out",
      },
      "-=0.5", // Mais overlap
    )
    .from(
      ".sub-headline",
      {
        y: 30, // Menos movimento
        duration: 0.8, // Mais rápido
        ease: "power2.out",
      },
      "-=0.7", // Mais overlap
    )
    .from(
      ".hero-actions .glow-button",
      {
        y: 20, // Menos movimento
        scale: 0.95,
        duration: 0.6, // Mais rápido
        ease: "back.out(1.2)", // Bounce sutil
      },
      "-=0.6", // Mais overlap
    )
    .from(
      ".hero-actions .glass-button",
      {
        y: 20,
        scale: 0.95,
        duration: 0.6,
        ease: "back.out(1.2)",
      },
      "-=0.5", // Quase simultâneo com o primeiro botão
    )
    .from(
      ".hero-bottom",
      {
        y: 15, // Movimento sutil
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8", // Mais overlap
    );

  // Add video fade-in effect - Paralelo com o resto
  gsap.from("#hero-video", {
    scale: 1.08, // Um pouco mais zoom
    duration: 1.5, // Mais rápido
    ease: "power2.out",
  });

  // PARALLAX: Hero content on scroll - SEM opacity
  gsap.to(".hero-content", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      toggleActions: "play none none reverse",
    },
    y: -80,
    scale: 0.96,
    ease: "none",
  });

  // PARALLAX: Hero bottom - SEM opacity
  gsap.to(".hero-bottom", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.8,
      toggleActions: "play none none reverse",
    },
    y: -40,
    ease: "none",
  });

  // Progressive blur effect on video
  gsap.to("#hero-video", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom center",
      scrub: 2,
    },
    filter: "blur(12px)",
    scale: 1.1,
    ease: "none",
  });

  // Scroll reveal for details - SEM opacity
  gsap.from(".tabs-container", {
    scrollTrigger: {
      trigger: ".details-section",
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
    y: 80,
    ease: "power2.out",
  });

  // Card Reveal Animations - SEM opacity
  const cards = document.querySelectorAll(".featured-card");
  cards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        scrub: 1.2,
      },
      y: 60,
      scale: 0.95,
      ease: "power2.out",
    });

    // Parallax suave nos cards
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
      y: -30,
      ease: "none",
    });
  });

  // Enhanced Tech Cards Animations - SEM opacity
  const techCards = document.querySelectorAll(".tech-card");
  techCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        scrub: 1,
      },
      y: 50,
      scale: 0.96,
      ease: "power2.out",
    });

    // Parallax effect on tech icons
    const icon = card.querySelector(".tech-icon");
    if (icon) {
      gsap.to(icon, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
        y: -40,
        rotation: 8,
        scale: 1.05,
        ease: "none",
      });
    }

    // Parallax no card inteiro
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 2.5,
      },
      y: -20,
      ease: "none",
    });
  });

  // Feature Cards Animations - NOVO!
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 65%",
        scrub: 1,
      },
      y: 50,
      scale: 0.96,
      ease: "power2.out",
    });

    // Parallax nos feature cards
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
      y: -25,
      ease: "none",
    });

    // Parallax nos ícones das features
    const featureIcon = card.querySelector(".feature-icon");
    if (featureIcon) {
      gsap.to(featureIcon, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -15,
        rotation: -3,
        ease: "none",
      });
    }
  });

  // Section Headers com parallax - SEM opacity
  const headers = document.querySelectorAll(".section-header");
  headers.forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        end: "top 60%",
        scrub: 1,
      },
      y: 60,
      ease: "power2.out",
    });

    // Parallax suave nos headers
    gsap.to(header, {
      scrollTrigger: {
        trigger: header,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
      y: -25,
      ease: "none",
    });
  });

  // Applications Section Animations
  gsap.from(".apps-grid", {
    scrollTrigger: {
      trigger: ".applications-section",
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
    y: 100,
    ease: "power2.out",
  });

  const appCards = document.querySelectorAll(".app-item-card");
  appCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: ".applications-section",
        start: "top 70%",
        end: "top 40%",
        scrub: 1.2,
      },
      x: 50,
      opacity: 0,
      delay: i * 0.2,
      ease: "power2.out",
    });
  });

  gsap.from(".app-media-container", {
    scrollTrigger: {
      trigger: ".applications-section",
      start: "top 75%",
      end: "top 45%",
      scrub: 1.5,
    },
    scale: 0.9,
    x: -50,
    ease: "power2.out",
  });
}
