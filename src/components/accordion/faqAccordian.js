/**
 * FAQs Accordion - Expandable accordion for FAQs section
 */

import { isMobile } from '../../utils/isMobile.js';

let faqsAccordionListeners = [];

/**
 * Initialize FAQs accordion
 */
export function faqAccordion() {
    const mobile = isMobile();

    const acc = document.getElementsByClassName("faq_toggle");
    const panels = document.getElementsByClassName("faqs_panel");

    for (let i = 0; i < acc.length; i++) {
        const handler = function () {
            for (let j = 0; j < panels.length; j++) {
                if (j !== i) {
                    panels[j].style.maxHeight = null;
                    acc[j].classList.remove("active");
                }
            }

            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if (typeof ScrollTrigger !== "undefined" && !mobile) {
                    ScrollTrigger.refresh();
                }
            }
        };

        acc[i].addEventListener("click", handler);
        faqsAccordionListeners.push({ el: acc[i], handler });
    }
}

/**
 * Destroy awards accordion listeners
 */
export function destroyFaqsAccordion() {
    faqsAccordionListeners.forEach(({ el, handler }) => {
        el.removeEventListener("click", handler);
    });
    faqsAccordionListeners = [];
}

/**
 * Animate accordion lines on scroll
 */
export function faqLineAnimation() {
    gsap.fromTo(
        ".faqs_accordion",
        { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" },
        {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            stagger: 0.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".faq_accordions",
                start: "top 70%",
            },
        }
    );
}

