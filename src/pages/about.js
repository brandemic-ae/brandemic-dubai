/**
 * About Page - Initialize and destroy animations
 */
import { initHeroAnimation, destroyHeroAnimation } from '../animations/hero/hero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';
import { initLineAnimations } from '../animations/text/lineAnimations.js';

// Sections
import { animateMilestones } from '../animations/sections/milestones.js';
import { scrollPinObserver, destroyScrollPinObserver } from '../animations/sections/process.js';
import { brandTicker, destroyBrandTicker } from '../animations/sections/ticker.js';

// Accordion
// import { initAccordionComponents, destroyAccordionComponents } from '../components/accordion/accordion.js';
import { initAccordionComponents, destroyAccordionComponents, lineAnimation } from '../components/accordion/accordion.js';

// Scroll
import { applyParallaxEffect } from '../animations/scroll/parallax.js';

// SVG
import { animateSvgPaths } from '../animations/svg/drawPaths.js';

// Swipers
import { initProcessSwiper, destroyProcessSwiper } from '../components/swiper/processSwiper.js';

import { initScrollArrows,destroyScrollArrows } from '../components/lottie/arrowScroll.js';

/**
 * Initialize all about page animations
 */
export function initAboutAnimations() {
    initHeroAnimation();
    initScrollArrows();
    animateMilestones();
    scrollPinObserver();
    brandTicker();
    initAccordionComponents();
    lineAnimation();
    initCharAnimations();
    initLineAnimations();
    applyParallaxEffect();
    animateSvgPaths();
    initProcessSwiper();
}

/**
 * Destroy all about page animations
 */
export function destroyAboutAnimations() {
    destroyHeroAnimation();
    destroyScrollPinObserver();
    destroyProcessSwiper();
    destroyBrandTicker();
    destroyAccordionComponents();
    destroyScrollArrows();
}

