/**
 * Contact Page - Initialize and destroy animations
 */

// Hero
import { initContactHeroAnimation, destroyContactHeroAnimation } from '../animations/hero/contactHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';

import { initWebflowLottie, destroyWebflowLottie } from '../components/lottie/lottie.js';

/**
 * Initialize all contact page animations
 */
export function initContactAnimations() {
    initCharAnimations();
    initContactHeroAnimation();
    initWebflowLottie();
}

/**
 * Destroy all contact page animations
 */
export function destroyContactAnimations() {
    destroyContactHeroAnimation();
    destroyWebflowLottie();
}

