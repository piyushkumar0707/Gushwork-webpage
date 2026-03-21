# Project Guidelines

had to make same website shown in Gushwork Assignment.png

## Code Style
- Use vanilla HTML, CSS, and JavaScript only. Do not add frameworks, package managers, or external JS libraries.
- Keep structure split across existing files: `index.html` for markup, `styles.css` for styles, and `script.js` for behavior.
- Prefer semantic HTML and BEM-style class naming.
- Keep accessibility intact: descriptive `alt` text, appropriate `aria-*` attributes, and keyboard-friendly interactions.

## Architecture
- This project is a single-page marketing site with section-based composition in `index.html`.
- Styling is token-driven through `:root` CSS variables in `styles.css` and scales via mobile-first breakpoints.
- Interactivity is centralized in `script.js` under a `DOMContentLoaded` entrypoint (sticky info bar, mobile nav, FAQ, carousel/zoom, CTA form).

## Build and Test
- No install/build step is required.
- Primary preview flow: open `index.html` in a browser.
- Optional local server if needed: `python -m http.server 8000` then open `http://localhost:8000`.
- Validate changes manually at three breakpoints: mobile (`<768px`), tablet (`>=768px`), desktop (`>=1280px`).

## Conventions
- Follow the project constraints and implementation expectations in `instruction file.md`.
- Use `implementation plan 2.md` as the section-level behavior/design checklist.
- Keep asset usage local under `assets/`; avoid introducing CDN assets except the existing font link unless requested.
- Avoid inline styles and inline event handlers when editing `index.html`; place styles in `styles.css` and logic in `script.js`.