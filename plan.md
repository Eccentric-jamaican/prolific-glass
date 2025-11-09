# Build Plan

## Goals
- Build the Prolific Glass site with a **mobile-first** approach while scaling gracefully to larger screens.
- Deliver smooth scroll tracking using **Lenis** and orchestrate animations with **Framer Motion**.
- Leverage **shadcn/ui** components for consistent styling and interaction patterns.

## Stack & Libraries
- **Framework**: Next.js 16 (App Router) with React 19.
- **Styling**: Tailwind utilities (via shadcn), custom CSS modules when needed.
- **Animations**: Framer Motion for entrance and interactive effects.
- **Smooth Scroll**: @studio-freight/lenis (ultra-smooth feel, all input types).
- **Other**: Open to adding GSAP/ScrollTrigger later if requirements demand.

## Scroll & Animation Strategy
- Initialize Lenis once and expose context/hooks for sections to subscribe to scroll progress.
- Synchronize Lenis RAF with Framer Motion to keep scroll-based transforms in sync.
- Default entrance pattern: gentle slide-in + fade-in; additional choreographies to be iterated per section.
- Provide sensible reduced-motion fallback (e.g., disable Lenis, limit animations) once requirements are clearer.

## Section Roadmap
1. **Infrastructure**
   - SmoothScroll Provider wrapper.
   - Animation presets utility (variants, easing tokens).
2. **Layout Foundation**
   - Mobile-first page scaffolding with semantic section wrappers and per-section div wrappers for control.
3. **Core Sections** (order TBD)
   - Hero
   - Services / Offerings
   - Testimonials / Social proof
   - CTA & Contact touchpoints
   - Footer
4. **Scroll Interactions**
   - Parallax / progress indicators / pinning (to be defined during iteration).

## Outstanding Decisions / To Refine
- Lenis tuning values (duration, smooth factor).
- Specific sections requiring advanced scroll effects.
- Global timing/easing tokens for animations.
- Sticky navigation behavior and interplay with Lenis.
- Reduced-motion behavior & accessibility confirmations.

## Next Actions
1. ✅ Implement SmoothScroll provider scaffold (Lenis + Framer Motion integration).
2. Set up animation preset utilities (basic slide/fade variants).
3. ✅ Lay down mobile-first layout structure using shadcn components.
4. Iterate on section content & scroll interactions as requirements solidify (features + testimonials + products complete).

### Completed (Nov 8, 2025)
- Sticky “Why choose Prolific Glass?” section rebuilt with Lenis-aligned center pinning and vertical carousel of feature reasons.
- Typography and accent styling match reference; intro copy handled entirely via carousel cards.
- Testimonials section implemented with bento-style grid, Framer Motion reveals, and CTA pairing.
- Products section added with horizontal carousel that slides in from the right as it enters view.
- Animated footer created with CTA stack, nav map, and contact block.

### Development Timeline
- **Lenis foundation** – wired SmoothScrollProvider into layout, synchronized with Framer Motion presets, documented reduced-motion handling.
- **Hero + Navbar pass** – established brand voice, CTA hierarchy, and navigation skeleton using shadcn buttons/links.
- **Features sticky scroll** – prototyped multiple iterations to match Lenis reference: locked left column, scroll-driven cards, accent typography.
- **Testimonials bento grid** – laid out masonry-like cards with staggered directional presets; adjusted card count for viewport fit.
- **Products carousel** – introduced horizontal snap list and right-to-left entrance animation with hidden scrollbar utility.
- **Footer wrap-up** – added animated closing CTA, informational columns, and legal links.

### Reusable Patterns / Notes
- Motion presets (`useMotionPreset`, `staggerContainer`) provide consistent easing/duration. Extend by adding new preset factories in `motion-presets.ts`.
- Sticky/animated sections avoid transforms on sticky parents; wrap animated elements inside child `motion.div`s.
- Horizontal scrolling tracks pair `snap-x` with `.scrollbar-hide` utility to keep UI clean.
- Accent headings use shared vertical bar + uppercase stack for brand cohesion; reuse structure from `features.tsx` and `products.tsx`.

### Mobile Thumb-Friendly Scrolling (Nov 9, 2025)
- Research recap (Smashing Magazine, “The Thumb Zone”): prioritize controls within the easy reach zone (center-bottom) and treat top corners as “stretch” for rarely used items.
- Spacing & sizing: keep vertical rhythm generous (56–72px between major touch targets) and ensure tappable areas ≥48px; swipe zones should be ≥45px tall to prevent accidental triggers.
- Navigation: consider sticky or bottom sheets for high-frequency actions, and reserve overlays/drawers for secondary menus so thumbs stay relaxed.
- Gestures: allow swipes to begin anywhere inside cards, avoid edge-only interactions, and align gesture targets diagonally toward the natural downward swipe path.
- Implementation notes: audit hero + CTA stack on mobile, lower key buttons if they sit above the comfortable zone, and test with real devices after Lenis adjustments to confirm inertia feels natural for thumb-driven scrolls.

## Sticky Scroll Notes (Nov 8, 2025)
- Sticky scroll requires the pinned column to avoid transforms; wrap animated content inside while the sticky container remains static.
- Lenis reference keeps the sticky column at viewport center by giving the sticky element full viewport height and centering contents via flex.
- Our implementation mirrors this: `aside` is `lg:sticky lg:top-0` with `min-h-screen` flex wrapper so the copy locks mid-viewport while cards scroll.
- For QA, need to validate via Playwright once additional MCP actions are available.

## Animation Jitter Stabilization (Nov 9, 2025)

### Summary
- Addressed jitter/stutter during fast scroll by stabilizing in-view triggers, promoting animated layers to GPU, and retuning scroll-driven springs.
- Kept native inertia for horizontal/vertical swipe zones by opting out of Lenis where appropriate.

### Lenis tuning
- Default (desktop): `lerp: 0.16`, `wheelMultiplier: 0.92`, `touchInertiaMultiplier: 1.12`, `syncTouchLerp: 0.08`.
- Coarse pointer (mobile/tablet): `syncTouch: false`, `lerp: 0.3`, `touchMultiplier: 1.2`, `touchInertiaMultiplier: 1`, softened easing.
- Files: `src/providers/smooth-scroll-provider.tsx`.

### Section changes
- Products (`src/components/site/products.tsx`)
  - In‑view: `viewport={{ once: true, amount: 0.3 }}` (removed negative margin thrash).
  - Track: `data-lenis-prevent` + `touch-pan-x overscroll-x-contain` and `transform-gpu will-change-transform`.
  - Cards: added `transform-gpu will-change-transform` on `motion.article`.
- Features (`src/components/site/features.tsx`)
  - Section: `data-lenis-prevent` + `touch-pan-y overscroll-y-contain`.
  - Promoted animated wrappers (`heading`, `cta`) and cards (`motion.li`) with `transform-gpu will-change-transform`.
  - Retuned scroll springs: translateY (stiffness 200, damping 38, mass 0.7) and opacity (stiffness 180, damping 36, mass 0.65).
- Testimonials (`src/components/site/testimonials.tsx`)
  - In‑view: `viewport={{ once: true, amount: 0.35 }}`, reduced stagger (`delay: 0.08, stagger: 0.08`).
  - Cards: added `transform-gpu will-change-transform`.
- Footer (`src/components/site/footer.tsx`)
  - Promoted animated wrappers to GPU layers with `transform-gpu will-change-transform`.

### QA checklist
- Mobile & desktop: rapid flick through sections, verify no replayed entrances or visible stutter.
- Chrome DevTools: Performance record with 4× CPU throttle; confirm <1–2 dropped frames on fast scroll.
- Elements panel: ensure animated nodes show their own layers (compositing border on).

### Notes / next steps
- If any section still jitters, move heavy effects (backdrop blur/large shadows) to non‑moving children and keep the translating node to `transform/opacity` only.
- For complex nested scroll areas, prefer `useInView` with explicit `root` and stable `amount` over aggressive negative `margin`.
