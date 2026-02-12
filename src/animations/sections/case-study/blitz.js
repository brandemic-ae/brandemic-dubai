let blitzMarqueeSVGs = [];
let blitzMarqueeSVGTweens = [];
export function initBlitzMarqueeSVG() {
  blitzMarqueeSVGs = Array.from(
    document.querySelectorAll(".blitz-text-svg")
  );

  if (!blitzMarqueeSVGs.length) return;

  // prevent duplicate init
  if (blitzMarqueeSVGTweens.length) return;

  blitzMarqueeSVGs.forEach((el) => {
    const tween = gsap.to(el, {
      x: "-100%",
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % 100)
      }
    });

    blitzMarqueeSVGTweens.push(tween);
  });
}

export function destroyBlitzMarqueeSVG() {
  if (!blitzMarqueeSVGTweens.length) return;

  blitzMarqueeSVGTweens.forEach(tween => tween.kill());

  blitzMarqueeSVGTweens = [];
  blitzMarqueeSVGs = [];
}