/**
 * Contact Page - Initialize and destroy animations
 */

// Hero
import { initContactHeroAnimation, destroyContactHeroAnimation } from '../animations/hero/contactHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';

import { initLotties, destroyLotties } from '../components/lottie/lottie.js';

/**
 * Initialize all contact page animations
 */
export function initContactAnimations(container) {
    initCharAnimations();
    initContactHeroAnimation();
    initLotties(container);

}

/**
 * Destroy all contact page animations
 */
export function destroyContactAnimations(container) {
    destroyContactHeroAnimation();
    destroyLotties(container);

}

