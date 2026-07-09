/**
 * Footer Animations - Footer text animation and copyright year
 */

/**
 * Animate "Think Limitless" text and footer AI elements in footer
 */
export function footerLimitless() {
    const thinkLimitless = document.querySelector('[data-anim-attr="think-limitless"]');
    if (thinkLimitless) {
        const splitLimitless = new SplitText(thinkLimitless, { type: "chars" });

        gsap.from(splitLimitless.chars, {
            y: "100%",
            stagger: 0.1,
            scrollTrigger: {
                trigger: thinkLimitless,
                start: "top 75%",
                toggleActions: "play none none none",
            }
        });
    }

    const footerAiEls = document.querySelectorAll('[data-anim-attr="footer_ai"]');
    if (footerAiEls.length) {
        gsap.from(footerAiEls, {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: footerAiEls[0],
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    }
}

/**
 * Set current year in copyright
 */
export function copyYear() {
    const yearSpan = document.querySelector('.copy_year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}