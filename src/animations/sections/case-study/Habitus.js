// Habitus SVG Scroll Animation

let habitusInstances = [];
let habitusActive = false;

export function initHabitusSVG() {
  // Guard 1: prevent double init
  if (habitusActive) return;

  const svgs = document.querySelectorAll(".habitus_svg");
  // Guard 2: page does not contain habitus SVGs
  if (!svgs.length) return;

  habitusActive = true;
  // Initial reset
  gsap.set(".habitus_svg path, .habitus_svg line, .habitus_svg circle", {
    drawSVG: "0%",
  });

  svgs.forEach((svg) => {
    const line = svg.querySelector(".is-line");
    if (!line) return; // Guard 3: malformed SVG

    const rest = svg.querySelectorAll("path:not(.is-line), circle");

    let restPlayed = false;

    // NON-SCRUBBED SVG TIMELINE
    const restTl = gsap.timeline({ paused: true });

    const primary = svg.querySelector(".is-primary");
    if (primary) {
      restTl.to(primary, {
        drawSVG: "100%",
        duration: 0.3,
        ease: "none",
      });
    }

    const remainingPaths = svg.querySelectorAll(
      "path:not(.is-line):not(.is-primary)",
    );
    if (remainingPaths.length) {
      restTl.to(remainingPaths, {
        drawSVG: "100%",
        duration: 0.3,
        ease: "none",
        stagger: 0.07,
      });
    }

    const circles = svg.querySelectorAll("circle");
    if (circles.length) {
      restTl.fromTo(
        circles,
        {
          drawSVG: "0%",
        },
        { drawSVG: "100%", duration: 0.3, ease: "none", stagger: 0.1 },
        "-=0.4",
      );
    }

    // SCRUBBED DRIVER LINE

    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
        markers: true,
        onUpdate(self) {
          if (self.progress === 1 && !restPlayed) {
            restPlayed = true;
            restTl.play();
          }

          if (self.progress < 1 && restPlayed) {
            restPlayed = false;
            restTl.pause(0);
            gsap.set(rest, { drawSVG: "0%" });
          }
        },
      },
    });

    scrubTl.to(line, {
      drawSVG: "100%",
      ease: "none",
    });

    habitusInstances.push({
      restTl,
      scrubTl,
      scrollTrigger: scrubTl.scrollTrigger,
    });
  });

  ScrollTrigger.refresh();
}

// Destroy Habitus SVG animation (Barba leave safe)
export function destroyHabitusSVG() {
  if (!habitusActive) return; // Guard 4: already destroyed / never init

  habitusInstances.forEach(({ restTl, scrubTl, scrollTrigger }) => {
    restTl?.kill();
    scrubTl?.kill();
    scrollTrigger?.kill();
  });

  habitusInstances = [];
  habitusActive = false;
}
