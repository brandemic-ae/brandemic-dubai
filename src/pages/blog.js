/**
 * Blog Page - Initialize and destroy animations
 */

// Hero
import { initBlogHeroAnimation, destroyBlogHeroAnimation } from '../animations/hero/blogHero.js';

// Sections
import { animateCTA } from '../animations/sections/cta.js';

/**
 * Initialize all blog page animations
 */
export function initBlogAnimations() {
    initBlogHeroAnimation();
    animateCTA();
}

/**
 * Destroy all blog page animations
 */
export function destroyBlogAnimations() {
    destroyBlogHeroAnimation();
}
