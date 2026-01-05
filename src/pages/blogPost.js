/**
 * Blog Post Page (CMS) - Initialize and destroy animations
 */

import { createHeroTimeline } from '../utils/heroTimeline.js';

// Sections
import { animateCTA } from '../animations/sections/cta.js';

let blogPostTl = null;

/**
 * Initialize all blog post page animations
 */
export function initBlogPostAnimations() {
    blogPostTl = createHeroTimeline();
    animateCTA();
}

/**
 * Destroy all blog post page animations
 */
export function destroyBlogPostAnimations() {
    if (blogPostTl) blogPostTl.kill();
}

