/**
 * Blog Hero Animation - Hero intro animation for blog pages
 * Similar to HPI Hero but without image animation
 */

import { createHeroTimeline } from '../../utils/heroTimeline.js';

let heroTl = null;

/**
 * Initialize Blog hero animation
 */
export function initBlogHeroAnimation() {
    heroTl = createHeroTimeline();

    const heroHeadline = document.querySelector(".hero-timeline-1");
    const heroPara = document.querySelector(".hero-timeline-2");

    if (!heroHeadline) return;

    const splitHeroHeadline = new SplitText(heroHeadline, { type: "chars,words,lines" });
    const splitHeroPara = heroPara ? new SplitText(heroPara, { type: "chars,words,lines" }) : null;

    heroTl.from(splitHeroHeadline.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        });

    if (splitHeroPara) {
        heroTl.from(splitHeroPara.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5");
    }
}

/**
 * Destroy Blog hero animation
 */
export function destroyBlogHeroAnimation() {
    if (heroTl) heroTl.kill();
}

