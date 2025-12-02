# 🚀 Brandemic Development Workflow

## 🌐 Environment URLs

| Environment | Purpose | JS URL | When to Use |
|-------------|---------|--------|-------------|
| **Production** | Live site | `@v1.0.0` (pinned) | After full testing |
| **Staging** | Testing | `@main` (latest) | Test new features |
| **Development** | Local dev | `@main` or local | Active development |

### Script URLs Template

**Production (in Webflow site settings):**
```html
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/brandemic-dubai-site@v1.0.0/dist/main.min.js"></script>
```

**Staging (in Webflow staging subdomain or test page):**
```html
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/brandemic-dubai-site@main/dist/main.js"></script>
```

---

## 🔄 Workflows

### Workflow A: Webflow-Only Changes (No JS Impact)

```
Webflow Dev makes changes
        ↓
Test in Webflow Designer preview
        ↓
Publish to staging subdomain
        ↓
Verify animations still work
        ↓
Publish to production
```

### Workflow B: Changes That Need New JS

```
1. Webflow Dev creates/updates page structure
        ↓
2. Add required classes (see Class Naming below)
        ↓
3. Publish to Webflow staging
        ↓
4. Create JS Request (see template below)
        ↓
5. JS Dev implements animation
        ↓
6. JS Dev pushes to main branch
        ↓
7. Test on staging with @main URL
        ↓
8. If good → Create version tag
        ↓
9. Update production script to new version
        ↓
10. Publish Webflow to production
```

### Workflow C: Bug Fix / Hotfix

```
1. Identify the issue
        ↓
2. JS Dev fixes in appropriate module
        ↓
3. npm run build
        ↓
4. git commit & push
        ↓
5. Test on staging (@main)
        ↓
6. Create patch version: git tag v1.0.X
        ↓
7. Update production URL to new version
```

---

## 🏷️ Class Naming Convention

### For Webflow Devs - Required Classes for JS

| Animation Type | Required Class | Example |
|----------------|----------------|---------|
| Character animation | `.animated-chars` | Headlines |
| Word animation | `.animated-words` | Paragraphs |
| Line animation | `.animated-lines` | Multi-line text |
| Parallax image | `.parallax-image` | Background images |
| Service element | `.services-element` | Service cards |
| Portfolio item | `.portfolio-item` | Work items |
| Filter button | `.filter` | Category filters |

### Page Namespaces (CRITICAL!)

Every page in Webflow MUST have `data-barba="container"` and `data-barba-namespace="X"`:

| Page | Namespace |
|------|-----------|
| Home | `home` |
| About | `about` |
| Portfolio/Work | `portfolio` |
| Contact | `contact` |
| Case Study (template) | `case-study` |
| Service pages | `service` |
| Thank You | `thanks` |

**In Webflow:** Add custom attribute on the page wrapper:
- `data-barba` = `container`
- `data-barba-namespace` = `home` (or appropriate namespace)

---

## 📝 JS Animation Request Template

When Webflow devs need new animations, create an issue/message with:

```markdown
## Animation Request

**Page:** [Which page]
**Section:** [Section name/description]
**Element Class:** [What class you added]

### Description
[What should happen]

### Trigger
- [ ] On page load
- [ ] On scroll into view
- [ ] On hover
- [ ] On click
- [ ] Other: ___

### Reference
[Link to similar animation or video/gif]

### Webflow Preview Link
[Link to the staging page]
```

---

## 🗂️ JS File Quick Reference

Need to change something? Here's where to look:

| What | File |
|------|------|
| Home page animations | `src/pages/home.js` |
| About page animations | `src/pages/about.js` |
| Portfolio filtering | `src/components/filter/portfolioFilter.js` |
| Navigation/menu | `src/components/navigation/megaMenu.js` |
| Custom cursor | `src/components/cursor/customCursor.js` |
| Page transitions | `src/core/barba.js` |
| Text animations | `src/animations/text/*.js` |
| Service hover | `src/animations/sections/serviceHover.js` |
| Video player | `src/components/video/videoPlayer.js` |
| Swipers | `src/components/swiper/*.js` |

---

## 🚨 Emergency Rollback

If something breaks in production:

### Option 1: Rollback JS Version
Change the script URL to previous version:
```html
<!-- From -->
<script src="...@v1.0.2/dist/main.min.js"></script>

<!-- To (previous working version) -->
<script src="...@v1.0.1/dist/main.min.js"></script>
```

### Option 2: Rollback Webflow
Use Webflow's backup feature to restore previous version.

### Option 3: Disable All Custom JS Temporarily
Replace script with empty/minimal version while debugging.

---

## 📊 Version History

Track all releases here:

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| v1.0.0 | 2024-XX-XX | Initial modular release | - |
| | | | |
