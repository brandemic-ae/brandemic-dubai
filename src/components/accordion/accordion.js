import { isMobile } from '../../utils/isMobile.js';

let accordionListeners = [];

function initAccordion(acc, panels) {
    const mobile = isMobile();
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
            }
            else{
                panel.style.maxHeight = panel.scrollHeight + "px";
                if (typeof ScrollTrigger !== "undefined" && !mobile) {
                    ScrollTrigger.refresh();
                }
            }
            
        }
        acc[i].addEventListener("click", handler);
        accordionListeners.push({ el: acc[i], handler });
    }
}

export function destroyAccordionListeners() {
    accordionListeners.forEach(({ el, handler }) => {
        el.removeEventListener("click", handler);
    });
    accordionListeners = [];
}

function faqLineAnimation() {
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
function awardsLineAnimation() {
    gsap.fromTo(
        ".awards_accordion",
        { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" },
        {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            stagger: 0.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".awards_accordions",
                start: "top 70%",
            },
        }
    );
}

export function initAccordionComponents() {
    const faqsAccordions = document.querySelectorAll(".faq_toggle");
    const awardsAccordions = document.querySelectorAll(".awards_toggle");

    const faqspanels = document.querySelectorAll(".faqs_panel");
    const awardsPanels = document.querySelectorAll(".awards_panel");

    initAccordion(faqsAccordions, faqspanels);
    initAccordion(awardsAccordions, awardsPanels);

    faqLineAnimation();
    awardsLineAnimation();
}

export function destroyAccordionComponents() {
    destroyAccordionListeners();
}