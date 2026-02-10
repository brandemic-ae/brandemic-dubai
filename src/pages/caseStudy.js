/**
 * Case Study Page - Initialize and destroy animations
 */

// Hero
import { initHPIHeroAnimation, destroyHPIHeroAnimation } from '../animations/hero/hpiHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';
import { initLineAnimations } from '../animations/text/lineAnimations.js';

// Sections
import { featuredWorkLoop } from '../animations/sections/featuredWork.js';
import { caseStudyTicker, livXTicker, hopscotchTicker, destroyTickers } from '../animations/sections/ticker.js';
import { animateCTA } from '../animations/sections/cta.js';
import { animateGalleryImages } from '../animations/sections/gallery.js';

// Scroll
import { applyParallaxEffect } from '../animations/scroll/parallax.js';

// Variant animations (case-study specific)
import { initHappyFeetAnimation, destroyHappyFeetAnimation } from '../animations/sections/case-study/happyfeet.js';
import { initHabitusSVG, destroyHabitusSVG } from '../animations/sections/case-study/habitus.js';

/**
 * Initialize all case study page animations
 */
export function initCaseStudyAnimations() {
    initHPIHeroAnimation();
    applyParallaxEffect();
    initCharAnimations();
    initLineAnimations();
    caseStudyTicker();
    featuredWorkLoop();
    animateCTA();
    animateGalleryImages();

    // Variant animations (element-guarded)
    livXTicker();
    hopscotchTicker();
    initHappyFeetAnimation();
    initHabitusSVG();
}

/**
 * Destroy all case study page animations
 */
export function destroyCaseStudyAnimations() {
    destroyHPIHeroAnimation();
    destroyTickers();
    destroyHappyFeetAnimation();
    destroyHabitusSVG();
}

