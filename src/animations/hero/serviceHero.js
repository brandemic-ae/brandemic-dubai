/**
 * Service Hero Animation - Scoped Version
 */

import { createHeroTimeline } from '../../utils/heroTimeline.js';

let serviceHeroTl = null;

export function initHeroAnimation() {
    const wrapper = document.querySelector(".section_service-hero");
    if (!wrapper) return;

    // ✅ Scoped selections
    const leftImages = wrapper.querySelectorAll('.is-one, .is-two, .is-three');
    const rightImages = wrapper.querySelectorAll('.is-four, .is-five, .is-six');

    serviceHeroTl = createHeroTimeline();

    const splitServiceTag = new SplitText(wrapper.querySelector(".service_hero-tl-0"), { type: "chars,words,lines" });
    const splitServiceHeroHeadline = new SplitText(wrapper.querySelector(".service_hero-tl-1"), { type: "chars,words,lines" });
    const splitServiceHeroPara = new SplitText(wrapper.querySelector(".service_hero-tl-2"), { type: "chars,words,lines" });

    serviceHeroTl
        .from(splitServiceTag.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.02,
        })
        .from(splitServiceHeroHeadline.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .from(splitServiceHeroPara.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .fromTo(leftImages, {
            x: -200,
            y: -100,
            scale: 0.5,
            rotation: -45,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
        }, "<")
        .fromTo(rightImages, {
            x: 200,
            y: -100,
            scale: 0.5,
            rotation: 45,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
        }, "-=1.3")
        .to(wrapper.querySelector(".scroll-down"), {
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=1.3")
        .add(() => {
            initHeroFloatingEffect(wrapper);
        });
}

function initHeroFloatingEffect(wrapper) {
    const floatTargets = [
        { selector: '.is-one', xFactor: 20, yFactor: 10, rotFactor: 5 },
        { selector: '.is-two', xFactor: 15, yFactor: 20, rotFactor: -6 },
        { selector: '.is-three', xFactor: 25, yFactor: 15, rotFactor: 4 },
        { selector: '.is-four', xFactor: -20, yFactor: 18, rotFactor: -5 },
        { selector: '.is-five', xFactor: -15, yFactor: 10, rotFactor: 6 },
        { selector: '.is-six', xFactor: -25, yFactor: 15, rotFactor: -4 },
    ];

    wrapper.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = wrapper.getBoundingClientRect();

        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;

        floatTargets.forEach(({ selector, xFactor, yFactor, rotFactor }) => {
            const el = wrapper.querySelector(selector);
            if (!el) return;

            gsap.to(el, {
                x: x * xFactor,
                y: y * yFactor,
                rotation: x * rotFactor,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });
}

export function destroyHeroAnimation() {
    if (serviceHeroTl) {
        serviceHeroTl.kill();
        serviceHeroTl = null;
    }
}
