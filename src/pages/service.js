/**
 * Service Page - Initialize and destroy animations
 */

// Hero
import { initHeroAnimation, destroyHeroAnimation } from '../animations/hero/serviceHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';

// Sections
import { serviceHoverAnimation, destroyServiceHoverAnimation } from '../animations/sections/serviceHover.js';
import { serviceProcessScroll, destroyServiceProcessScroll } from '../animations/sections/process.js';

// Scroll
import { startScrollDownAnimation } from '../animations/scroll/scrollDown.js';

// SVG
import { animateSvgPaths } from '../animations/svg/drawPaths.js';

// Swipers
import { initFeaturedSwiper, destroyFeaturedSwiper } from '../components/swiper/featuredSwiper.js';
import { initTestimonialsSwiperScripts, destroyTestimonialsSwiperScripts } from '../components/swiper/testimonialsSwiper.js';

// FAQ
import { initAccordionComponents, destroyAccordionComponents, lineAnimation } from '../components/accordion/accordion.js';

//FeaturedWorks
import { animateWorkImages, destroyFeaturedWorkLoop } from '../animations/sections/featuredWork.js';

// Lottie
import { initLotties, destroyLotties } from '../components/lottie/lottie.js';

/**
 * Initialize all service page animations
 */
export function initServiceAnimations() {
    initHeroAnimation();
    initAccordionComponents();
    lineAnimation();
    animateWorkImages();
    startScrollDownAnimation();
    initCharAnimations();
    animateSvgPaths();
    initFeaturedSwiper();
    serviceProcessScroll();
    serviceHoverAnimation();
    initTestimonialsSwiperScripts();
    initLotties();
}

/**
 * Destroy all service page animations
 */
export function destroyServiceAnimations() {
    destroyHeroAnimation();
    destroyAccordionComponents();
    destroyFeaturedSwiper();
    destroyServiceProcessScroll();
    destroyServiceHoverAnimation();
    destroyFeaturedWorkLoop();
    destroyTestimonialsSwiperScripts();
    destroyLotties();
}

