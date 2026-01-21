/**
 * Cortex VR - Main Entry Module
 */

import { translations } from './translations.js';
import { initI18n } from './i18n.js';
import { initAnimations } from './animations.js';
import { initCore, initNavigation } from './script.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Platform Logic
    initCore();
    
    // 2. Internationalization (Premium Protocol)
    initI18n(translations);
    
    // 3. Navigation Protocols
    initNavigation();
    
    
    // 5. Expose Animations for the Loader callback
    // The loader in script.js calls window.__initAnims() when fadeout completes
    window.__initAnims = initAnimations;

    console.log("Cortex VR: Systems Synchronized.");
});
