/**
 * Blog Post Page (CMS) - Initialize and destroy animations
 */

import { createHeroTimeline } from '../utils/heroTimeline.js';

// Sections
import { animateCTA } from '../animations/sections/cta.js';

// Components
import { initTableOfContents, destroyTableOfContents } from '../components/toc/tableOfContents.js';

// Smooth Scroll
import { refreshSmoother } from '../core/smoothScroll.js';

let blogPostTl = null;

/**
 * Initialize all blog post page animations
 */
export function initBlogPostAnimations() {
    blogPostTl = createHeroTimeline();
    animateCTA();
    initTableOfContents();
    refreshSmoother();
}

/**
 * Destroy all blog post page animations
 */
export function destroyBlogPostAnimations() {
    if (blogPostTl) blogPostTl.kill();
    destroyTableOfContents();
}

