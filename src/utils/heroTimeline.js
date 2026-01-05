/**
 * Hero Timeline Utility - Creates base timeline with autoAlpha for all pages
 * Ensures autoAlpha completes before page-specific animations run
 */

/**
 * Create a hero timeline with the base autoAlpha animation
 * @returns {gsap.core.Timeline} Timeline with autoAlpha already added
 */
export function createHeroTimeline() {
    const tl = gsap.timeline();
    tl.fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" });
    return tl;
}

