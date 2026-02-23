# 🎯 Class Reference for Webflow Developers

This document lists ALL classes that have JavaScript animations attached.
**⚠️ DO NOT rename or remove these classes without coordinating with JS developer.**

---

## 🔴 Critical Classes (Breaking if Changed)

### Page Structure
| Class | Purpose | Used In |
|-------|---------|---------|
| `#smooth-wrapper` | ScrollSmoother wrapper | All pages |
| `#smooth-content` | ScrollSmoother content | All pages |
| `.page-wrapper` | Main page wrapper | All pages |
| `.main-wrapper` | Content wrapper (fade in) | All pages |

### Navigation
| Class | Purpose |
|-------|---------|
| `.hamburger_link` | Menu toggle button |
| `.hamburger` | Hamburger icon (gets `.is-active`) |
| `.mega_menu` | Full menu overlay |
| `.mega_menu-cta` | Menu CTA section |
| `.mega_menu-gradient` | Menu gradient bg |
| `.nav_link-wrapper` | Nav links container |
| `.nav_link` | Individual nav link |
| `.nav_link-block` | Nav link hover block |
| `.nav_link-block-services` | Services dropdown |
| `.nav_arrow-icon` | Arrow icon in nav |
| `.nav_image` | Floating image in nav |
| `.sub_nav-wrapper` | Sub-navigation container |
| `.sub_nav-link` | Sub-navigation links |

### Cursor
| Class | Purpose |
|-------|---------|
| `.inner-dot` | Custom cursor dot |
| `.link-hover-ix` | Elements that scale cursor |

### Buttons
| Class | Purpose |
|-------|---------|
| `.button.is-fill` | Buttons with fill effect |
| `.button__flair` | Fill effect element |

---

## 🟡 Animation Classes (Page-Specific)

### Text Animations (Add these to trigger animations)
| Class | Animation |
|-------|-----------|
| `.animated-chars` | Staggered character reveal |
| `.animated-words` | Staggered word reveal |
| `.animated-lines` | Line-by-line reveal |

### Parallax
| Class | Effect |
|-------|--------|
| `.parallax-image` | Smooth parallax scrolling |

---

## 🏠 Home Page Classes

### Hero
| Class | Purpose |
|-------|---------|
| `.hero_anim-chars` | Hero headline animation |
| `#heading_keywords` | Rotating words container |

### Featured Work
| Class | Purpose |
|-------|---------|
| `.work_images-wrapper` | Work gallery container |
| `.work_image` | Individual work image |
| `.our-work_block` | Trigger for animation |
| `.our-work_title` | Work section title |
| `.our-work_title-wrapper` | Title wrapper |

### Services
| Class | Purpose |
|-------|---------|
| `.services-element` | Service card (hover expand) |
| `.service_line` | Animated line |
| `.service_description` | Description (hidden → shown) |
| `.service_image` | Floating service image |
| `.service_heading` | Service title |
| `.service_number` | Service number |

### Vision Section
| Class | Purpose |
|-------|---------|
| `.section_our-vision` | Vision section container |
| `.our-vision_content-wrapper` | Content wrapper |
| `.our-vision_image` | Floating images |

### CTA
| Class | Purpose |
|-------|---------|
| `.cta_text-wrapper` | CTA container |
| `.cta_paragraph` | CTA text paragraphs |
| `.cta_span-image.is-one` | First inline image |
| `.cta_span-image.is-two` | Second inline image |
| `.desktop-hidden` | Hidden on desktop |
| `.mobile-hidden` | Hidden on mobile |

### Scrolling Text
| Class | Purpose |
|-------|---------|
| `.scroll_text-wrapper` | Horizontal scroll text |

### Video
| Class | Purpose |
|-------|---------|
| `.showreel` | Video element |
| `#videoCursor` | Custom video cursor |
| `.custom-video-cursor` | Cursor styling |
| `.icon-play` | Play icon |
| `.icon-close` | Close icon |
| `.fullscreen-video` | Fullscreen state class |

### Swipers
| Class | Purpose |
|-------|---------|
| `.is-tools` | Tools swiper |
| `.is-testimonials` | Testimonials swiper |
| `.testimonials-next` | Next button |
| `.testimonials-prev` | Prev button |

### SVG
| Class | Purpose |
|-------|---------|
| `.brandemic-logo-draw` | SVG container |
| `.brandemic_svg-path` | SVG paths to animate |

---

## 📄 About Page Classes

### Hero
| Class | Purpose |
|-------|---------|
| `.hero-timeline-1` | Hero headline |
| `.hero-timeline-2` | Hero paragraph |
| `.hero-timeline-3` | Hero image/element |

### Milestones
| Class | Purpose |
|-------|---------|
| `.milestone_block` | Milestone container |
| `.milestone_line` | Animated line |
| `.milestone_number` | Milestone number |

### Process (Desktop)
| Class | Purpose |
|-------|---------|
| `.section_process-desktop` | Process section |
| `.process_heading` | Process step heading |
| `.process_description` | Process step description |
| `.process_image` | Process step image |

### Process (Mobile Swiper)
| Class | Purpose |
|-------|---------|
| `.is-process` | Process swiper |
| `.process-next` | Next button |
| `.process-prev` | Prev button |

### Tickers
| Class | Purpose |
|-------|---------|
| `.brand_logo` | Brand logos ticker |
| `.team_ticker-wrapper.is-one` | Team row 1 |
| `.team_ticker-wrapper.is-two` | Team row 2 (reversed) |
| `.team_card` | Individual team card |
| `.culture_image` | Culture images ticker |

### Awards
| Class | Purpose |
|-------|---------|
| `.awards_accordions` | Accordions container |
| `.awards_accordion` | Single accordion |
| `.awards_toggle` | Toggle button |
| `.awards_panel` | Expandable panel |

---

## 💼 Portfolio Page Classes

### Filters
| Class | Purpose |
|-------|---------|
| `.filter` | Filter button (needs `id` matching category) |
| `.portfolio-item` | Portfolio item |
| `.category` | Category text inside item |

---

## 📬 Contact Page Classes

### Hero
| Class | Purpose |
|-------|---------|
| `.section_contact-hero` | Hero section |
| `.contact_hero-tl-1` | Headline |
| `.contact_hero-tl-2` | Paragraph |
| `.contact_hero-tl-3` | Form/CTA element |
| `#greeting-text` | Rotating greeting text |
| `.is-one` through `.is-six` | Floating images |

---

## 🎨 Service Page Classes

### Hero
| Class | Purpose |
|-------|---------|
| `.section_service-hero` | Hero section |
| `.service_hero-tl-0` | Tag/label |
| `.service_hero-tl-1` | Headline |
| `.service_hero-tl-2` | Paragraph |
| `.is-one` through `.is-six` | Floating images |
| `.scroll-down` | Scroll indicator |

### Featured Swiper
| Class | Purpose |
|-------|---------|
| `.is-featured-swiper` | Featured projects swiper |
| `.featured-next` | Next button |
| `.featured-prev` | Prev button |

### Process Scroll
| Class | Purpose |
|-------|---------|
| `.section-service-process` | Horizontal scroll section |
| `.service_process-contents` | Scrolling content |

---

## 📁 Case Study Classes

### Tickers
| Class | Purpose |
|-------|---------|
| `.case_studies-ticker-element` | Case study ticker |
| `.case_study-ticker-image` | Ticker images |
| `.is-livx-texts` | LivX ticker container |
| `.livx_ticker-text` | LivX ticker text |

### Gallery
| Class | Purpose |
|-------|---------|
| `.gallery_image` | Gallery images |

---

## ✅ Thank You Page Classes

| Class | Purpose |
|-------|---------|
| `.thank_hero-tl-1` | Headline |
| `.thank_hero-tl-2` | Paragraph |
| `.thank_hero-tl-3` | Additional element |

---

## 🦶 Footer Classes (All Pages)

| Class | Purpose |
|-------|---------|
| `.think-limitless` | Animated footer text |
| `.copy_year` | Copyright year (auto-updated) |

---

## 📌 Barba.js Attributes

Every page MUST have these on the main content container:

```html
<div data-barba="container" data-barba-namespace="PAGE_NAME">
  <!-- Page content -->
</div>
```

| Page | Namespace Value |
|------|-----------------|
| Home | `home` |
| About | `about` |
| Portfolio | `portfolio` |
| Contact | `contact` |
| Case Study | `case-study` |
| Service | `service` |
| Thank You | `thanks` |

