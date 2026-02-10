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

let gyglMarqueeSVGTween = null;
let gyglMarqueeSVGEl = null;

export function initGyglMarqueeSVG() {
  gyglMarqueeSVGEl = document.querySelector(".gygl-marquee-svg");
  if (!gyglMarqueeSVGEl) return;

  // prevent duplicate init
  if (gyglMarqueeSVGTween) return;

  gyglMarqueeSVGTween = gsap.to(gyglMarqueeSVGEl, {
    x: "-100%",
    duration: 40,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % 100)
    }
  });
}

export function destroyGyglMarqueeSVG() {
  if (!gyglMarqueeSVGEl) return;

  if (gyglMarqueeSVGTween) {
    gyglMarqueeSVGTween.kill();
    gyglMarqueeSVGTween = null;
  }

  gyglMarqueeSVGEl = null;
}
