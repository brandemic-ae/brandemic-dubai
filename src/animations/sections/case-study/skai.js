let skaiTextPathTween = null;
let skaiTextPathEl = null;

export function initSkaiTextPathAnimation() {
  skaiTextPathEl = document.querySelector("#text-path");
  if (!skaiTextPathEl) return;

  // prevent duplicate init
  if (skaiTextPathTween) return;

  skaiTextPathTween = gsap.to(skaiTextPathEl, {
    duration: 40,
    repeat: -1,
    ease: "linear",
    attr: { startOffset: "100%" }
  });
}

export function destroySkaiTextPathAnimation() {
  if (!skaiTextPathEl) return;

  if (skaiTextPathTween) {
    skaiTextPathTween.kill();
    skaiTextPathTween = null;
  }

  skaiTextPathEl = null;
}
