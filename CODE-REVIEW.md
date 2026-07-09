# Code Review — brandemic-web

**Date:** 2026-07-09 · **Scope:** full `src/` (core, pages, components, animations, utils, footer), with focus on the recent class → `data-anim-attr` selector migration.

---

## Verdict

The architecture is solid — clean Barba orchestration, consistent page-module pattern, and the case-study SVG modules are a model init/destroy template. The selector migration is **roughly 60% done and has introduced one real bug** (`vision.js`). The biggest systemic risk is not selectors but **resource leaks across Barba transitions**: several modules add listeners or infinite timelines with no destroy, and **no module anywhere reverts its SplitText**, which accumulates DOM wrappers on every navigation.

---

## 1. Selector Migration Status (class → `data-anim-attr`)

**Convention observed:** a single `data-anim-attr="value"` attribute (111 usages) instead of per-purpose attributes. Framework IDs (`#smooth-wrapper`, `#wf-form-Contact-Form`, SVG `#wavePath`/`#textPath`) are fine as-is.

### ✅ Fully migrated
`drawPaths`, `parallax`, `scrollingText`, `charAnimations`, `wordAnimations`, `lineAnimations`, `milestones`, `cta`, `homeHero`, `hpiHero`, `blogHero`, `contactHero`, `flout`, `Screworks`, `skai`, `buttonFill`, `accordion`, and all page modules (`src/pages/*` — the only inline selectors, in `caseStudy.js:43-54`, are data-attrs).

### ⚠️ Mixed within one file (highest inconsistency risk)
| File | Issue |
|------|-------|
| `animations/sections/vision.js` | **Bug** — init selects `[data-anim-attr="section_our-vision"]` (line 13), destroy selects `.section_our-vision` (line 82). If Webflow drops the class, destroy early-returns and the `mousemove`/`mouseleave` listeners leak. |
| `animations/sections/case-study/Habitus.js:14` | `gsap.set(".habitus_svg path, ...")` class selector inside an otherwise-migrated file. |
| `animations/sections/process.js` | `serviceProcessScroll` migrated; `servicesOfferingPin` (lines 213–222) still class-based. |
| `animations/hero/thankHero.js:15-32` | Only hero still on classes (`.thank_hero-tl-1/2/3`) — also unguarded SplitText (throws if element missing). |

### ❌ Not yet migrated (class hooks still in JS)
- **Components layer (least migrated — 2 of 15 modules):** `videoPlayer`, `tableOfContents`, `customCursor`, `megaMenu`, `navHover`, all 4 swipers, `portfolioFilter`, `shareButton`, `arrowScroll`.
- **Animations:** `featuredWork.js` (entirely class-based, driven from home/service/caseStudy), `gallery.js`, `gygl.js` (`.gygl-marquee-svg`), `blitz.js`, `happyfeet.js`.
- **Core/utils/footer:** `footer.js:43` (`.copy_year` — sibling function in same file is migrated), `heroTimeline.js` (`.main-wrapper`), `case-preview-iframe-loader.js`, `barba.js:92` (`.link-hover-ix`).
- **Swiper nav inconsistency:** process uses IDs (`#process-next`), featured/testimonials use classes.

### Naming drift in attribute values
kebab-case and snake_case mixed arbitrarily: `hero-timeline-1` vs `contact_hero-tl-1` vs `hero-tl-0`; `team_ticker-wrapper-one` vs `team_ticker_wrapper_collection-one` in the same file (`ticker.js`). Pick one convention (suggest kebab-case) before migrating the rest.

### 📄 Docs out of date
`CLASS-REFERENCE.md` predates the migration (last touched Feb 2026) and never mentions `data-anim-attr`; neither do README or CLAUDE.md. Webflow devs coordinating off that doc will rename attributes the JS depends on. **Update it (or add `ATTR-REFERENCE.md`) — this is the highest-leverage doc fix.**

---

## 2. High-Severity Bugs

1. **`core/barba.js:62-67` — TDZ ReferenceError on first transition.** `done()` is called *before* `const done = this.async()` is declared. The skip-first-leave guard throws `Cannot access 'done' before initialization` instead of skipping. Move the `const done` declaration above the guard.
2. **`pages/caseStudy.js` — infinite loop leak.** `featuredWorkLoop()` is initialized (line 37) but `destroyFeaturedWorkLoop` is never imported/called. The `repeat:-1` + Draggable timeline and hover-listener Map (retaining detached nodes) survive every case-study exit. Home and service pages do this correctly.
3. **`utils/horizontalLoop.js` — resize listener + Draggable never torn down.** The cleanup function is returned to the discarded `gsap.context`, not to the caller; every ticker created adds a permanent `window` resize listener. Affects brand/team/culture tickers on every navigation.
4. **SplitText never reverted anywhere.** No `split.revert()` in the codebase. On a Barba SPA the split wrappers persist and re-splitting double-wraps text. Affects `text/*`, all heroes, `cta.js`, `vision.js`, `process.js`, `footer.js`.
5. **`core/barba.js:103-110` — kill order wrong.** `recreateSmoother()` runs first, then `ScrollTrigger.getAll().kill()` kills the freshly created smoother's own trigger. Kill first, recreate after.
6. **`components/videoPlayer.js:136-149`** — `removeEventListener` is passed freshly created closures so it never removes anything, and `destroyStartVideo` is an admitted no-op; fullscreen/keydown/click handlers and a mobile ScrollTrigger accumulate.

## 3. Medium-Severity

- **No destroy export at all** (listeners/timelines survive transitions): `buttonFill`, `customCursor`, `megaMenu`, `navHover`, `footer.js` (`footerLimitless` re-runs on every `beforeEnter`), `text/char|word|lineAnimations`, `cta`, `scrollingText` (also **re-clones children each init → DOM grows every navigation**).
- **`core/barba.js:124`** — `document.addEventListener('lazyloaded', ...)` added on *every* transition, never removed; handlers (each firing `ScrollTrigger.refresh()`) accumulate.
- **`animations/sections/process.js:167`** — `Observer.getAll().forEach(kill)` kills *all* Observers globally; pin ScrollTrigger + SplitText also never cleaned.
- **`components/navHover.js:12`** — `querySelector('.nav_arrow-icon', '.nav_link-block-services')`: second argument is silently ignored (querySelector takes one). Likely intended a combined selector.
- **Contact form blocklist (`contactForm.js:7-16`)** — client-side and exact-match only: visible in the shipped bundle, and Gmail dot/plus variants bypass it. Move to the Cloudflare Worker and normalize (strip dots/`+suffix` for gmail). Also: `grecaptcha` used unguarded (line 65) — throws if the reCAPTCHA script hasn't loaded.
- **Unguarded querySelectors** that throw when the element is absent: `customCursor.js:36,40` (`.page-wrapper`), `megaMenu.js:90`, `navHover.js:52`, `smoothScroll.js:41` (`ScrollSmoother.get()` result used without null check), `happyfeet.js` (`#wavePath`/`#textPath` inside a guarded parent).
- **Ticker/hero listener leaks** — `ticker.js` destroys loops but not hover listeners or its `ScrollTrigger.create` instances; `hero.js`/`contactHero.js` floating-effect `mousemove`/`mouseleave` never removed.

## 4. Duplication & Cleanup (low)

- **Marquee logic ×5:** `ticker.js` `initMarqueeSVG` (generic, attribute-driven) vs near-identical copies in `gygl.js`, `blitz.js`, `skai.js`, `scrollingText.js`. Reuse the generic one. Same for the `flout.js`/`Screworks.js` identical rotation loops.
- **Swiper modules ×4** are structurally identical — a `createSwiperModule(selector, options, {mobileOnly})` factory would collapse them and fix the class-vs-ID nav inconsistency.
- **Page-level clusters** (`charAnimations` + `cta` + `parallax` + `svgPaths` + accordion + ticker) repeat across 4–5 pages — a shared `commonAnimations` init/destroy pair would prevent asymmetries like the caseStudy leak.
- File naming: `Screworks.js`, `Habitus.js` are PascalCase among camelCase siblings (risk on case-sensitive filesystems).
- Dead code: `barba.js:28-51` `getHeroAnimationFunction` unused; `about.js:16` commented import; `tableOfContents.js:258` unused `originalHandler`; one stray `console.log` (`featuredSwiper.js:36`).
- `serviceHover.js` gates refresh on `pathname === "/"` — fragile with regional paths (`dataset.region` exists elsewhere).
- `shareButton.js` double-click within 2s makes "Link Copied!" permanent.

## 5. What's Good

- Barba views have clean, uniform `afterEnter`/`beforeLeave` symmetry; page modules are pure orchestrators.
- Case-study SVG modules (`flout`, `Screworks`, `gygl`, `blitz`, `skai`, `happyfeet`, `Habitus`) are the best pattern in the tree: module state, idempotency guards, symmetric destroys — use them as the retrofit template.
- `serviceHover.js` cleanup-function bookkeeping (`serviceHoverCleanupFns`) is the correct listener model for the leaky modules to copy.
- Swipers, TOC, contact form, portfolio filter, share button all have proper instance destroy.
- Only one `console.log` in all of `src/`; releases are scripted and dist stays in sync with src.

## 6. Recommended Order of Work

1. Fix the `barba.js` TDZ bug and kill-order (kill triggers → recreate smoother).
2. Fix `vision.js` destroy selector; add `destroyFeaturedWorkLoop()` to `caseStudy.js`.
3. Make `horizontalLoop` return its cleanup (or the context) and call it from ticker destroys.
4. Add `SplitText.revert()` + destroys to `text/*`, `cta`, heroes, `footer.js`; fix `scrollingText` clone accumulation and the `lazyloaded` listener accumulation.
5. Add destroys to `customCursor`, `megaMenu`, `navHover`, `buttonFill`, `videoPlayer` (fix the closure-reference bug).
6. Finish the selector migration (components layer + `featuredWork`, `thankHero`, `gallery`, case-study stragglers), settle on kebab-case values, then **update CLASS-REFERENCE.md to document `data-anim-attr` values**.
7. Consolidate marquee/swiper/page-cluster duplication; move the email blocklist server-side.
