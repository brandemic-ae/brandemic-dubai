/**
 * Thank You Page - Initialize and destroy animations
 */

// Hero
import { initThankHeroAnimation, destroyThankHeroAnimation } from '../animations/hero/thankHero.js';

// Smooth Scroll
import { refreshSmoother } from '../core/smoothScroll.js';

/**
 * Initialize all thank you page animations
 */
export function initThankAnimations() {
    initThankHeroAnimation();
    refreshSmoother();
}

/**
 * Destroy all thank you page animations
 */
export function destroyThankAnimations() {
    destroyThankHeroAnimation();
}

