# Clark's Cakes & Confections — website design concept

An unsolicited, single-page **redesign concept** for [Clark's Cakes & Confections](https://www.facebook.com/ClarksCakesAndConfections/) — a custom cake & confections bakery in Livingston, LA, owned by cake artist Clark Robertson. The business currently has **no website**, only Facebook & Instagram.

This is a portfolio/pitch piece: *"this can be yours right now."*

## What it is

A fully static, responsive, accessible one-page site with:

- **Hero** — signature-cake slot + "Custom cakes for life's big moments"
- **Story** — the 20+ year, made-fresh-to-order, booked-solid narrative
- **What We Make** — wedding, custom/sculpted, birthday/celebration, confections
- **Gallery** — a photography-forward grid ready for real Facebook/Instagram photos
- **Kind Words** — testimonial block (clearly-labeled illustrative quotes for now)
- **Consultation request form** — the real money feature (name, date, cake type, guest count, details)
- **Visit / Contact** — real address, phone, email, service area, Google Maps link

Art direction: **elegant editorial patisserie** — warm cream, dusty rose & sage, deep charcoal ink, gold hairline detailing, Cormorant Garamond display serif, generous whitespace.

## Real data used

- **Name / owner:** Clark's Cakes & Confections — Clark Robertson (20+ years)
- **Address:** 21196 LA Highway 444, Livingston, LA 70754
- **Phone:** (225) 315-6471 (from public Tripadvisor / bakerias listing)
- **Email:** clarkscakes@yahoo.com
- **Socials:** facebook.com/ClarksCakesAndConfections, instagram.com/clarkscakes
- **Facts:** made fresh to order; specialties in wedding, groom's, birthday & custom cakes; 2026 weddings fully booked; annual ordering pause July 1–Oct 1

## What still needs the owner

- **Photos** — Clark's real cake photos live behind Facebook/Instagram login and weren't web-downloadable, so every image slot is an art-directed placeholder marked `<!-- IMG-NEEDED: ... -->`. Drop in real JPGs (optimized < 400 KB) and they slot straight into hero, story, and gallery.
- **Reviews** — testimonial quotes are labeled illustrative; swap in real Google/Facebook reviews.
- **Hours** — no posted hours were confirmed (`<!-- TODO: confirm posted hours -->`); currently shown as "by appointment."

## SEO

On-page SEO is wired for local search: unique `<title>` + meta description, a single `<h1>`, JSON-LD `Bakery` structured data (name, telephone, address, opening hours, price range, image, url, areaServed, and `sameAs` Facebook/Instagram), complete Open Graph + Twitter Card tags, a `<link rel="canonical">`, plus `robots.txt` and `sitemap.xml` at the repo root.

**Base URL placeholder:** every absolute URL — canonical, `og:url`, the JSON-LD `url`/`image`, `robots.txt`, and `sitemap.xml` — uses the literal placeholder `https://REPLACE-WITH-DOMAIN.com/`. At deploy, do a one-line find-and-replace of `https://REPLACE-WITH-DOMAIN.com/` with the real domain across `index.html`, `robots.txt`, and `sitemap.xml`. (An `assets/og-image.jpg` share image is referenced but still needs to be dropped in.)

## How to view

Open `index.html` by double-clicking it — no build step, no dependencies (one Google Fonts `<link>`; everything else is self-contained).

---

*Website design concept — an unsolicited pitch, not affiliated with or endorsed by the business.*
