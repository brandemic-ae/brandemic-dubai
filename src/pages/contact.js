/**
 * Contact Page - Initialize and destroy animations
 */

// Hero
import { initContactHeroAnimation, destroyContactHeroAnimation } from '../animations/hero/contactHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';

// Smooth Scroll
import { refreshSmoother } from '../core/smoothScroll.js';

/**
 * Initialize all contact page animations
 */
export function initContactAnimations() {
    initCharAnimations();
    initContactHeroAnimation();
    refreshSmoother();
}

/**
 * Destroy all contact page animations
 */
export function destroyContactAnimations() {
    destroyContactHeroAnimation();
}

