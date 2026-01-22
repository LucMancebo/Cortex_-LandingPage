/**
 * Internationalization & Scramble Effect Logic
 */

const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789$+-*/=?!";
let currentLang = localStorage.getItem('cortex-lang') || 'pt';
let appTranslations = null;

export function initI18n(translations) {
    appTranslations = translations;
    updateContent(true);
    updateLangIndicator(true);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentLang === btn.dataset.lang) return;

            currentLang = btn.dataset.lang;
            localStorage.setItem('cortex-lang', currentLang);

            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateContent(false);
            updateLangIndicator();
        });
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function updateLangIndicator(instant = false) {
    const activeBtn = document.querySelector('.lang-btn.active');
    const indicator = document.querySelector('.lang-indicator');
    if (!activeBtn || !indicator) return;

    if (instant) indicator.style.transition = 'none';

    indicator.style.width = `${activeBtn.offsetWidth}px`;
    indicator.style.left = `${activeBtn.offsetLeft}px`;

    if (instant) {
        setTimeout(() => indicator.style.transition = '', 50);
    }
}

export function scrambleText(element, finalValue) {
    if (!element) return;
    const duration = 0.8;
    const frameSkip = 2;
    let frame = 0;

    const tl = gsap.timeline();

    tl.to({}, {
        duration: duration,
        onUpdate: function () {
            frame++;
            if (frame % frameSkip !== 0) return;

            let result = "";
            const progress = this.progress();

            for (let i = 0; i < finalValue.length; i++) {
                if (i < progress * finalValue.length) {
                    result += finalValue[i];
                } else {
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = result;
        },
        onComplete: function () {
            element.textContent = finalValue;
        }
    });

    gsap.fromTo(element, { opacity: 0.8 }, { opacity: 1, duration: 0.1, repeat: 5 });
}

export function updateContent(isInitial = false) {
    if (!appTranslations) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const targetText = appTranslations[currentLang][key];

        if (targetText) {
            // Check if text contains HTML tags (for branding)
            const hasHTML = /<[a-z][\s\S]*>/i.test(targetText);

            if (isInitial || hasHTML) {
                el.innerHTML = targetText;
            } else {
                scrambleText(el, targetText);
            }
        }
    });

    // Update Page Title if key exists
    const pageTitle = appTranslations[currentLang]['page-title'];
    if (pageTitle) {
        document.title = pageTitle;
    }
}

export const getCurrentLang = () => currentLang;
