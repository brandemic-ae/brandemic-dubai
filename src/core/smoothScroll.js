/**
 * Smooth Scroll - ScrollSmoother initialization
 */

// Global smoother instance
let smoother = null;

/**
 * Initialize ScrollSmoother
 */
export function initSmoothScroller() {
    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        smoothTouch: 0,
    });
}

/**
 * Get the current smoother instance
 * @returns {ScrollSmoother}
 */
export function getSmoother() {
    return smoother;
}

/**
 * Set the smoother instance (used after page transitions)
 * @param {ScrollSmoother} newSmoother 
 */
export function setSmoother(newSmoother) {
    smoother = newSmoother;
}

/**
 * Recreate smoother instance (used in Barba transitions)
 */
export function recreateSmoother() {
    smoother = ScrollSmoother.get();
    smoother.scrollTo(0);
    smoother.kill();
    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        smoothTouch: 0,
    });
    return smoother;
}

/**
 * Refresh smoother to re-parse data-speed attributes
 * Call this after page content with data-speed elements is loaded
 */
export function refreshSmoother() {
    if (smoother) {
        smoother.refresh(true);
    }
}
