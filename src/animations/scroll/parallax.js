/**
 * Parallax Effect - Smooth parallax on images
 */

import { getSmoother, refreshSmoother } from '../../core/smoothScroll.js';

/**
 * Apply parallax effect to images
 */
export function applyParallaxEffect() {
    const smoother = getSmoother();
    if (smoother) {
        smoother.effects(".parallax-image", { speed: "auto" });
        // Refresh to re-parse all data-speed attributes after transition
        refreshSmoother();
    }
}

