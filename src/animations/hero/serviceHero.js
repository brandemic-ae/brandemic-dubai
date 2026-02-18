/**
 * Service Hero Animation - Debug Version
 */

import { createHeroTimeline } from '../../utils/heroTimeline.js';

let serviceHeroTl = null;

export function initHeroAnimation() {
    console.log("🔵 initHeroAnimation called");

    const wrapper = document.querySelector(".section_service-hero");
    console.log("Wrapper found:", !!wrapper);

    const leftImages = document.querySelectorAll('.is-one, .is-two, .is-three');
    const rightImages = document.querySelectorAll('.is-four, .is-five, .is-six');

    console.log("Left images count:", leftImages.length);
    console.log("Right images count:", rightImages.length);

    serviceHeroTl = createHeroTimeline();
    console.log("Timeline created:", !!serviceHeroTl);

    const splitServiceTag = new SplitText(".service_hero-tl-0", { type: "chars,words,lines" });
    const splitServiceHeroHeadline = new SplitText(".service_hero-tl-1", { type: "chars,words,lines" });
    const splitServiceHeroPara = new SplitText(".service_hero-tl-2", { type: "chars,words,lines" });

    const serviceLeftImages = ['.is-one', '.is-two', '.is-three'];
    const serviceRightImages = ['.is-four', '.is-five', '.is-six'];

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
        .fromTo(serviceLeftImages, {
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
            onStart: () => console.log("Animating LEFT images"),
            onComplete: () => {
                console.log("LEFT images final state:");
                leftImages.forEach(img => {
                    console.log(img.className, getComputedStyle(img).transform);
                });
            }
        }, "<")
        .fromTo(serviceRightImages, {
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
            onStart: () => console.log("Animating RIGHT images"),
            onComplete: () => {
                console.log("RIGHT images final state:");
                rightImages.forEach(img => {
                    console.log(img.className, getComputedStyle(img).transform);
                });
            }
        }, "-=1.3")
        .to(".scroll-down", {
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=1.3")
        .add(() => {
            console.log("Timeline completed");
            initHeroFloatingEffect();
        });
}

function initHeroFloatingEffect() {
    const wrapper = document.querySelector(".section_service-hero");
    if (!wrapper) {
        console.log("⚠ Floating effect: wrapper not found");
        return;
    }

    console.log("Floating effect initialized");

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
            gsap.to(selector, {
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
    console.log("🔴 destroyHeroAnimation called");
    if (serviceHeroTl) {
        serviceHeroTl.kill();
        serviceHeroTl = null;
    }
}
