# ArtisanCrafts — IBM UX Design Capstone Project

## About This Project

This is the final capstone submission for the IBM UX Design Professional Certificate course. The brief asked for a series of UX design deliverables — user flows, wireframes, an interactive prototype, a component library, and high-fidelity mockups — typically produced inside a design tool like Figma or Miro.

I took a different approach.

Instead of producing static design files, I built a fully functional, hosted React website that satisfies every task requirement interactively in the browser. The reasoning was straightforward: a live site demonstrates UX thinking more honestly than a static prototype. A real user can actually navigate it, trigger state changes, and experience the designed flows — not just click through a locked Figma frame. It also gave me the opportunity to think about design decisions as implementation decisions, which sharpened the rationale behind every choice.

The site is for **ArtisanCrafts** — a fictional South African e-commerce marketplace connecting buyers with independent handmade goods makers. The product exists to solve a specific problem: handmade goods are emotionally driven purchases, but most e-commerce platforms present them the same way they present mass-produced items. ArtisanCrafts puts the maker story, craft process, and provenance at the centre of every product experience.

---

## How to Run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Site Structure

The site has eight navigable pages, accessible from the top navbar. Each page maps directly to one or more course tasks.

| Page                            | Navbar Link           | Task Coverage    |
| ------------------------------- | --------------------- | ---------------- |
| Home / Product Discovery        | Explore               | Tasks 4, 5, 6, 8 |
| Artisan Profile                 | Artisans              | Tasks 4, 5, 6, 8 |
| Product Detail                  | (via product cards)   | Tasks 4, 5, 6, 8 |
| Shopping Cart                   | Cart icon (top right) | Tasks 4, 5, 6, 8 |
| Checkout                        | (via Cart)            | Tasks 4, 5, 6, 8 |
| Style Guide & Component Library | Style Guide           | Task 7           |
| User Flow & Task Flow Diagrams  | UX Flows              | Task 2           |
| Prioritization Matrix           | Prioritization        | Task 3           |

---

## The Fidelity Switcher

The most distinctive feature of this submission is the **fidelity switcher** — a three-option pill fixed at the top centre of every page. It lets any viewer (including the marker) toggle the entire site between three modes simultaneously:

### Wireframe

The default view. Greyscale palette, crosshatch image placeholders, wireframe annotation panels beneath each page. This corresponds to the mid-fidelity wireframe deliverables in Tasks 4 and 5. The "Mid-fidelity wireframe" badge appears in the bottom right corner indicating which screen is being viewed.

### High-Fidelity

The palette shifts to a warm artisan colour system (terracotta primary, olive secondary, cream background). Placeholder images are replaced with real photography. Annotation panels disappear. Typography, spacing, and component hierarchy are refined. This corresponds to Task 8's high-fidelity mockup requirement.

### Interactive

Identical to High-Fidelity, with micro-interactions layered on top. Buttons respond to hover and press with scale and colour transitions. Product cards lift on hover. Product images zoom subtly. The checkout step flow is fully operable. This corresponds to Task 6's interactive prototype requirement, demonstrating default, hover, and active component states with smooth transitions.

Because every component in the site is built on a shared set of CSS design tokens (colour, spacing, radius, typography), switching fidelity mode re-skins the entire site in a single state change — the same principle as a well-structured Figma component library where swapping a style updates everything at once.

---

## Task-by-Task Reference

### Task 2 — User Flow & Task Flow (UX Flows page)

The UX Flows page contains two diagrams rendered as inline SVG using standard UX flowchart notation:

- **Ovals** — Start and End points
- **Rectangles** — Screens and actions
- **Diamonds** — Decision points
- **Arrows** — Flow direction, labelled where the path branches

The **User Flow** maps the complete end-to-end journey from a new visitor arriving on the site to completing a purchase, including branches for browsing vs. searching, detours to the Artisan Profile page, and the checkout failure recovery path.

The **Task Flow** focuses on a single specific goal: a returning user purchasing the Hand-thrown Ceramic Mug. It shows the straight-line happy path and the single critical decision point at payment authorisation.

Both diagrams include written annotations below them explaining the rationale for each significant step or branch.

### Task 3 — Prioritization Matrix (Prioritization page)

A 2×2 matrix plotting 16 product features by:

- **X-axis**: Effort to build (Low → High)
- **Y-axis**: User value / Impact (Low → High)

Features are colour-coded by strategic quadrant: Quick Wins (do now), Big Bets (plan carefully), Fill-ins (later), and Avoid/Reconsider. Below the matrix is a **Key Feature Insights** section with five numbered decisions — each one tied directly to a feature cluster on the matrix — explaining the reasoning behind what was built first, what was deferred, and why.

### Tasks 4 & 5 — Wireframe Screens & Connected Flows

Four key screens, each responsive (desktop and mobile in a single adaptive layout):

1. **Home / Product Discovery** — Hero banner, mood filter chips, curated collections grid, product grid with sort controls, artisan spotlight strip, trust bar, footer
2. **Product Detail** — Multi-image gallery with thumbnails, product info with quantity stepper, materials & provenance section, artisan story teaser, reviews, related products, mobile sticky Add to Cart bar
3. **Artisan Profile** — Hero with craft context, trust signals bar, craft process steps, artisan story, products by this maker, customer reviews, follow CTA
4. **Shopping Cart & Checkout** — Cart with line items, quantity controls, promo code, order summary; 3-step checkout (Shipping → Payment → Review) with a sticky order summary on desktop and a sticky CTA bar on mobile

All five screens are connected: clicking a product card navigates to Product Detail, clicking an artisan card or "Read Lena's full story" navigates to the Artisan Profile, "Add to Cart" goes to the Cart, and the Cart's checkout button enters the Checkout flow. The Navbar logo always returns to Home.

### Task 6 — Interactive Components & Micro-Interactions

Switch to **Interactive** mode to see:

- **Buttons**: darken 10% on hover, scale to 97% on press (active state)
- **Cards**: lift with a box shadow and translate up 2px on hover
- **Product images**: scale to 1.05 on hover (Smart Animate–style transition)
- **Quantity steppers**, **checkout step tabs**, **remove-item buttons**: all fully interactive with visible state changes
- All transitions use `ease` curves at 180–200ms — fast enough to feel snappy, slow enough to be perceptible

Component states (default, hover, active, disabled) are documented visually on the Style Guide page.

### Task 7 — Style Guide & Component Library

The Style Guide page documents:

- **Colour styles**: primary, secondary, and neutral tokens, each with hex value and semantic role. The token values update when you switch fidelity modes, showing how the same token system drives both the wireframe and high-fidelity looks.
- **Typography styles**: display (DM Serif Display), body medium and regular (DM Sans), and eyebrow/label style — each shown at size with typeface, size, and weight annotated
- **Spacing scale**: visual bar representation of the spacing steps used throughout the site
- **Radius scale**: four border-radius values shown as rendered shapes
- **Iconography**: the full icon set used across the site (lucide-react, 16–18px, 1.5px stroke) with photography behaviour noted
- **Reusable components**: product card, form inputs (default/focus/disabled), buttons (default/hover/active/secondary/disabled/icon) — each documented with a short description of the state logic

### Task 8 — High-Fidelity Mockups

Switch to **High-Fidelity** mode. Every screen updates to:

- A warm artisan palette: terracotta (`#b5582e`) primary, olive (`#6f7a5e`) secondary, cream background (`#fbf7f1`), warm border tones
- Real photography replacing all crosshatch placeholders
- Refined typographic hierarchy — the serif display face picks up the terracotta primary colour
- Primary buttons and interactive elements use the terracotta colour, consistent with the style guide tokens
- Annotation panels are hidden; the layout presents as a polished, complete mockup

---

## Design Decisions

**Why one responsive layout instead of separate desktop and mobile files?**
A single adaptive layout is how real products ship. Maintaining two separate files would require every design decision to be made twice. The mobile and desktop experiences are differentiated through Tailwind's responsive prefixes (`md:`, `sm:`) — the same approach a production engineering team would use.

**Why a warm artisan palette for the high-fidelity theme?**
The original wireframes used a neutral greyscale intentionally, so content decisions were not influenced by colour. For high-fidelity, the colour choices reflect the product's subject: terracotta references fired clay, the primary material of the featured artisan; olive references natural dyes and botanical craft. Both feel grounded in the South African handmade goods context without being clichéd.

**Why host it rather than submit a design file?**
A hosted prototype is more accessible to anyone reviewing the work — no software needed, no login, no frame-by-frame clicking. It also demonstrates that the design is buildable: every layout decision, spacing choice, and interaction was tested in a real browser, which surfaces edge cases (overflow, wrapping, touch targets) that a static mockup would not.

---

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for utility-based styling
- **Vite** for development and build
- **lucide-react** for iconography
- **Picsum Photos** for seeded placeholder photography in high-fidelity mode
- No routing library — navigation is managed with a single `useState` page variable, matching the mental model of a Figma prototype flow

---

_IBM UX Design Professional Certificate — Capstone Project_
