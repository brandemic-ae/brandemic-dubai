let scrollArrowTL = null;

export function initScrollArrows() {

  if (scrollArrowTL) {
    scrollArrowTL.kill();
    scrollArrowTL = null;
  }

  const arrow1 = document.querySelector(".arrow-1");
  const arrow2 = document.querySelector(".arrow-2");

  if (!arrow1 || !arrow2) return;

  scrollArrowTL = gsap.timeline({ repeat: -1 });

  scrollArrowTL
    .fromTo(arrow1,
      { y: 0, opacity: 0 },
      { y: 20, opacity: 1, duration: 0.5, ease: "power2.out" }
    )

    .to({}, { duration: 0.4 })

    .fromTo(arrow2,
      { y: 0, opacity: 0 },
      { y: 18, opacity: 1, duration: 0.5, ease: "power2.out" }
    )

    .to(arrow1, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.out"
    })

    .to(arrow2, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.out"
    })

    .set([arrow1, arrow2], { y: 0 });
}

export function destroyScrollArrows() {
  if (scrollArrowTL) {
    scrollArrowTL.kill();
    scrollArrowTL = null;
  }
}
