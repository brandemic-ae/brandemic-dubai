let gyglTextPathTween = null;
let gyglTextPathEl = null;

export function initGyglTextPathAnimation() {
  gyglTextPathEl = document.querySelector("#text-path");
  if (!gyglTextPathEl) return;

  // prevent duplicate init
  if (gyglTextPathTween) return;

  gyglTextPathTween = gsap.to(gyglTextPathEl, {
    duration: 40,
    repeat: -1,
    ease: "linear",
    attr: { startOffset: "100%" }
  });
}

export function destroyGyglTextPathAnimation() {
  if (!gyglTextPathEl) return;

  if (gyglTextPathTween) {
    gyglTextPathTween.kill();
    gyglTextPathTween = null;
  }

  gyglTextPathEl = null;
}
let gyglMarqueeSVGEls = [];
let gyglMarqueeSVGTweens = [];

export function initGyglMarqueeSVG() {
  gyglMarqueeSVGEls = Array.from(
    document.querySelectorAll(".gygl-marquee-svg")
  );

  if (!gyglMarqueeSVGEls.length) return;

  // prevent duplicate init
  if (gyglMarqueeSVGTweens.length) return;

  gyglMarqueeSVGEls.forEach((el) => {
    const tween = gsap.to(el, {
      x: "-100%",
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % 100)
      }
    });

    gyglMarqueeSVGTweens.push(tween);
  });
}

export function destroyGyglMarqueeSVG() {
  if (!gyglMarqueeSVGTweens.length) return;

  gyglMarqueeSVGTweens.forEach(tween => tween.kill());

  gyglMarqueeSVGTweens = [];
  gyglMarqueeSVGEls = [];
}



