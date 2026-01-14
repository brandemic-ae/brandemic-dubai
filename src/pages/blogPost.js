/**
 * Blog Post Page (CMS) - Initialize and destroy animations
 */

import { createHeroTimeline } from '../utils/heroTimeline.js';

// SVG
import { animateSvgPaths } from '../animations/svg/drawPaths.js';

// Sections
import { animateCTA } from '../animations/sections/cta.js';

// Components
import { initTableOfContents, destroyTableOfContents } from '../components/toc/tableOfContents.js';
import { initShareButton, destroyShareButton } from '../components/share/shareButton.js';

let blogPostTl = null;

/**
 * Initialize all blog post page animations
 */
export function initBlogPostAnimations() {
    blogPostTl = createHeroTimeline();
    animateSvgPaths();
    animateCTA();
    initTableOfContents();
    initShareButton();
}

/**
 * Destroy all blog post page animations
 */
export function destroyBlogPostAnimations() {
    if (blogPostTl) blogPostTl.kill();
    destroyTableOfContents();
    destroyShareButton();
}

