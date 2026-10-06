# Portfolio — Fahad Umrani

A professional, responsive single-page portfolio built with **plain HTML, CSS and JavaScript** — no frameworks, no build step.

## 🚀 Run it

Just open `index.html` in your browser, or serve it locally:

```bash
npx serve .        # or: python -m http.server
```

## 📁 Structure

```
portfolio/
├── index.html          # all sections: hero, about, skills, projects, experience, contact
├── style.css           # CSS variables + all styling (light professional theme)
├── script.js           # menu, scroll effects and back-to-top
├── favicon.svg         # site icon
└── *.svg / *.webp      # project and contributor images
```

## ✏️ Customization

1. **Colors** — edit the CSS variables at the top of `style.css` (`--primary`, `--bg`, etc.).
2. **Text & content** — all copy lives in `index.html`; projects, skills and the timeline are plain markup.
3. **Photo** — the About section uses the GitHub avatar (`https://github.com/fahadumrani.png`); swap the `src` for a local image if preferred.

## ✨ Features

- 🎨 Clean light theme with a professional navy/slate accent (all colors are CSS variables — recolor in one place)
- 🎯 Active nav highlighting + navbar state, driven by a **single throttled scroll handler**
- 📱 Fully responsive with a hamburger menu, Escape-to-close, and a skip-to-content link
- 🔝 Back-to-top button
- 🎬 Scroll-reveal animations (respects `prefers-reduced-motion`)
- 🔍 SEO meta tags, Open Graph and JSON-LD Person schema, custom SVG favicon
