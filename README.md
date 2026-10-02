
PORTFOLIO_LINK :- **https://my-portfolio-omega-tawny-37.vercel.app/**


# Nagendra Kushwaha Portfolio

A light, editorial Vite + React portfolio for an aspiring AI/ML Engineer, Data Scientist, and Generative AI / LLM Developer.

## Features

- White/off-white premium visual system with one orange accent
- Responsive homepage with selected project preview
- Dedicated `/projects` archive with dynamic category filters
- Dedicated `/skills` capability map with category filters and search
- Centralized project data in `src/data/projects.js`
- Centralized skill data in `src/data/skills.js`
- Automatic project image fallback until real screenshots are added
- Shared project details modal
- Lightweight path-aware navigation that keeps the Vite setup intact
- Responsive mobile menu, keyboard focus states, reduced-motion support, SEO metadata, favicon, robots, and sitemap

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Routes

- `/` homepage
- `/projects` full project archive
- `/skills` searchable skills archive

## Add a project

1. Add `cover.png` and any screenshots to the appropriate folder under `public/projects/`.
2. Add one object to `src/data/projects.js`.
3. Include `featured: true` if it should appear on the homepage.

The card and details modal will automatically use the image, categories, badges, concepts, and links from the data object. Missing images render a deliberate `Project Preview` placeholder instead of a broken image icon.

## Add a skill

Add one `skill(name, level, category, description)` entry to `src/data/skills.js`. The Skills page automatically includes it in filters and search.

Use `Core`, `Working Knowledge`, or `Exploring`; the site intentionally avoids fabricated percentages.

## Resume and contact

Place the real resume at `public/resume/Nagendra_Kushwaha_AI_ML_Resume.pdf`. The project does not create a fake PDF.

Update email and LinkedIn in `src/data/portfolio.js` when available. The UI currently shows editable placeholders because those details were not provided.

## Customization and deployment

The primary design tokens live at the top of `src/App.css`, including paper, ink, accent, borders, and shadows. Build with `npm run build`, then deploy `dist` to Vercel, Netlify, or another static host.

Replace `https://example.com/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the real deployed URL before launch.
