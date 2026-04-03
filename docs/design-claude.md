# Tripax Homes Ltd. — Design System & UI Guidelines

**Version:** 4.0 | **Last Updated:** April 3, 2026  
**Project:** Corporate Website & CMS | **Status:** Approved for Development  
**Aesthetic:** Edison-Inspired Minimalism | **Theme:** Emerald Estate (Forest Green & Gold)

---

## 📋 Table of Contents

1. [Target Audience & Personas](#target-audience--personas)
2. [Design System](#design-system)
3. [Typography System](#typography-system)
4. [UI Component Guidelines](#ui-component-guidelines)
5. [Animation & Motion Strategy](#animation--motion-strategy)
6. [Page Layout Specifications](#page-layout-specifications)
7. [Page-Specific Design Highlights](#page-specific-design-highlights)
8. [Imagery & Media (Cloudinary)](#imagery--media-cloudinary)
9. [Responsive Design Guidelines](#responsive-design-guidelines)
10. [Accessibility Standards](#accessibility-standards-wcag-21-aa)
11. [Design QA Checklist](#design-qa-checklist)

---

## 👥 Target Audience & Personas

Understanding the core audience drives the layout and visual cues of the website.

| Persona                         | Goal                                                   | Key Touchpoints                               |
| :------------------------------ | :----------------------------------------------------- | :-------------------------------------------- |
| **Landowner**                   | Monetize idle land via construction & profit-sharing   | Services, Contact Form, Chatbot, Case Studies |
| **Flat Buyer**                  | Find secure, well-located apartments in Dhaka          | Projects Portfolio, Filters, WhatsApp CTA     |
| **Corporate/Commercial Client** | Lease/buy commercial spaces, partner on infrastructure | Services, About, Admin-generated Lead Routing |
| **Internal Admin/Marketing**    | Update projects, stats, content, track inquiries       | `/admin` CMS Dashboard, Inquiry Tracking      |

---

## 🎨 Design System

### Color Palette

All colors are selected to reflect trust, structure, and vibrant call-to-actions appropriate for a premium construction firm in Dhaka.

| Role                     | Color | Hex       | RGB                  | Usage                                                   |
| ------------------------ | ----- | --------- | -------------------- | ------------------------------------------------------- |
| **Primary Forest Green** | 🌲    | `#11261A` | `rgb(17, 38, 26)`    | Headers, primary backgrounds, trust elements            |
| **Secondary Deep Green** | 🌳    | `#0A1810` | `rgb(10, 24, 16)`    | Deep depth, card footers, layered backgrounds           |
| **Signature Gold**       | ✨    | `#F2CD13` | `rgb(242, 205, 19)`  | Accent labels, active states, premium highlights        |
| **Soft Highlight Gold**  | 🌟    | `#D9D059` | `rgb(217, 208, 89)`  | Gradient secondary, subtle hover highlights             |
| **Neutral White**        | ⚪    | `#FFFFFF` | `rgb(255, 255, 255)` | Primary backgrounds, clean space                        |
| **Creamy Neutral**       | 🥛    | `#FDFDFD` | `rgb(253, 253, 253)` | Section backgrounds, minimalist cards                   |
| **Warmer Gray-900**      | ⚫    | `#11261A` | `rgb(17, 38, 26)`    | Primary body text (brand-tinted dark green)             |

### Color Usage Guidelines

```css
/* Tailwind CSS v4 Token Mapping */
:root {
  --color-primary: #11261A;
  --color-secondary: #0A1810;
  --color-accent: #F2CD13;
  --color-highlight: #D9D059;

  /* Semantic mappings */
  --color-cta-primary: var(--color-accent);
  --color-cta-hover: var(--color-highlight);
  --color-text-primary: var(--color-primary);
  --color-bg-surface: #ffffff;
}
```

### Accessibility Contrast Ratios

All color combinations meet **WCAG 2.1 AA** or exceed to **AAA** standards:

| Combination               | Ratio | WCAG Level | Status |
| ------------------------- | ----- | ---------- | ------ |
| Gold on Forest Green      | 4.6:1 | AA ✅      | Pass   |
| White on Forest Green     | 12.1:1| AAA ✅     | Pass   |
| Forest Green on White     | 12.1:1| AAA ✅     | Pass   |
| Gold on White (Small)     | 1.8:1 | ❌ FAIL    | Avoid  |
| Gold on White (Large)     | 1.8:1 | ❌ FAIL    | Avoid  |

---

## 🔤 Typography System

### Font Families

| Role          | Primary Font        | Fallback                           | Weight  | Usage                          |
| ------------- | ------------------- | ---------------------------------- | ------- | ------------------------------ |
| **Headings**  | `Montserrat`        | `system-ui`, `sans-serif`          | 600-800 | H1-H6, section titles, CTAs    |
| **Body**      | `Plus Jakarta Sans` | `Geist`, `Inter`, `sans-serif`     | 400-500 | Paragraphs, labels, UI text    |
| **Monospace** | `Geist Mono`        | `monospace`                        | 400     | Code snippets, technical specs |

#### Alternative Typography

- **Plus Jakarta Sans** – Recommended for hero areas, taglines, and brand statements (contemporary, sophisticated aesthetic appropriate for real estate/construction)

### Font Loading Strategy (Next.js `next/font`)

```typescript
// app/layout.tsx
import { Montserrat, Inter } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

### Type Scale

| Token                     | Font Size       | Line Height    | Font Weight | Example Use            |
| ------------------------- | --------------- | -------------- | ----------- | ---------------------- |
| `text-4xl` / `heading-xl` | 2.25rem (36px)  | 1.1            | 800         | Hero headlines         |
| `text-3xl` / `heading-lg` | 1.875rem (30px) | 1.2            | 700         | Section titles         |
| `text-2xl` / `heading-md` | 1.5rem (24px)   | 1.3            | 700         | Card titles            |
| `text-xl` / `heading-sm`  | 1.125rem (18px) | 1.4            | 600         | Subheadings            |
| `text-base` / `body-lg`   | 0.9375rem (15px)| 1.6            | 400         | Body paragraphs        |
| `text-sm` / `body-md`     | 0.8125rem (13px)| 1.6            | 400         | Captions, labels       |
| `text-xs` / `body-xs`     | 0.75rem (12px)  | 1.0            | 700         | Accent Labels          |

### Typography Best Practices

- ✅ Use `font-[family]` utility classes from Tailwind v4
- ✅ Apply `leading-tight` for headings, `leading-relaxed` for body text
- ✅ Ensure minimum touch target of 44px for interactive text elements
- ✅ Use `text-balance` (Tailwind v4) for headline optimization on mobile
- ✅ Respect `font-display: swap` for web font loading optimization

---

## 🧩 UI Component Guidelines (shadcn/ui v4.1+)

All components are built with **shadcn/ui v4.1+** (Radix primitives + Tailwind) and customized to match the Tripax color palette.

### Core Components Inventory

| Component             | Source    | Customization Notes                                                             |
| --------------------- | --------- | ------------------------------------------------------------------------------- |
| `Button`              | shadcn/ui | Primary: `bg-accent text-white`, Secondary: `bg-secondary`, Outline: `border-accent` |
| `Card`                | shadcn/ui | Add subtle shadow `shadow-md hover:shadow-lg transition-shadow`                 |
| `ProjectCarousel`     | Custom    | Horizontal Snap-scroll, Aspect 3/4 cards, Gradient overlays                     |
| `InquiryForm`         | Custom    | Minimalist inputs, single-column on mobile, 50/50 split with image on desktop   |
| `Input` / `Textarea`  | shadcn/ui | Form fields with Zod validation feedback                                        |
| `Select` / `Combobox` | shadcn/ui | Project filters, inquiry type dropdowns                                         |
| `Badge`               | shadcn/ui | Status tags: `Completed` (Emerald), `Ongoing` (Gold), `Planned` (Gray)          |
| `Avatar`              | shadcn/ui | Team member photos with fallback initials                                       |
| `Tabs`                | shadcn/ui | Service categories, project filter toggles                                      |

### Button Variants

```tsx
// components/ui/button.tsx extension
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#FF7F3E] text-white hover:bg-[#e66a2e]", // Primary CTA
        secondary: "bg-[#2A629A] text-white hover:bg-[#1e4a7a]", // Secondary action
        outline:
          "border-2 border-[#003285] text-[#003285] hover:bg-[#003285]/10",
        ghost: "hover:bg-[#2A629A]/10 text-[#003285]",
        link: "text-[#FF7F3E] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
```

### Layout System

- **Container Max Width:** `1280px` centered with `px-4 sm:px-6 lg:px-8`
- **Section Spacing:** `py-12 sm:py-16 lg:py-20`
- **Grid Gaps:** `gap-4` mobile, `gap-6` tablet, `gap-8` desktop
- **Flex Utilities:** Prefer `flex`, `grid`, `contents` for layout; avoid absolute positioning

### Button Patterns

| Type        | Background              | Text    | Border      | Hover state                         |
| ----------- | ----------------------- | ------- | ----------- | ----------------------------------- |
| Primary CTA | Gold Gradient (#F2CD13) | White   | None        | Lighten to #D9D059, scale 1.02      |
| Secondary   | Forest Green (#11261A)  | Gold    | Gold 1px    | Background Gold, text Forest Green  |
| Ghost (nav) | Transparent             | White   | None        | Text Gold, 0.5s transition          |

**Accessibility:** Focus rings (`ring-2 ring-offset-2 ring-[#FF7F3E]`), minimum touch target 44×44px.

### Card Patterns

- **Border radius:** `rounded-xl` (0.75rem)
- **Shadow:** `shadow-md` on idle, `shadow-xl` on hover
- **Transition:** `transform-gpu transition-all duration-200`
- **Image container:** Aspect ratio 4/3 for project cards, 1/1 for team members

### Form Elements

- **Input fields:** Border `#2A629A`, focus ring `#FF7F3E`, rounded lg
- **Labels:** `text-sm font-medium text-[#003285]`
- **Validation:** Inline error messages (red, `#DC2626`) with Zod + React Hook Form

### Navigation

- **Desktop:** Horizontal bar, dropdown menus for Projects (by status/type) and Services
- **Mobile:** Sheet component (shadcn) sliding from right, burger icon
- **Sticky header:** `backdrop-blur-md bg-white/90` on scroll

### Chatbot Widget (Floating)

- **Closed state:** Circular button (`w-14 h-14`) with 💬 icon, orange gradient, `shadow-xl`, fixed `bottom-right`
- **Open state:** Card (`w-80 sm:w-96`) with white background, `rounded-xl`, header, message area, input, and close button
- **Streaming indicator:** Typing dots animation (three bouncing dots)
- **Accessibility:** `aria-label`, focus trap when open, ESC to close

---

## 🎬 Animation & Motion Strategy

To keep the site performant (especially on mobile devices in Bangladesh), we follow a zero-overhead approach using modern browser APIs.

### Library: `motion/react` v12.38+ (React 19 Compatible)

```bash
npm install motion@latest
```

### Animation Principles

1. **Performance First**: Use `useAnimate` hook (~2kb) over `<motion.div>` where possible
2. **Lazy Load Animations**: Wrap animated sections in `<LazyMotion>` to defer loading
3. **Native View Transitions**: Use Next.js 16 View Transitions API for page navigation
4. **Respect Prefers-Reduced-Motion**: Always provide non-animated fallbacks

### Core Animation Patterns

| Use case            | Implementation                                                        |
| ------------------- | --------------------------------------------------------------------- |
| Fade-in on scroll   | Intersection Observer + CSS transition (no JS bundle)                 |
| Counting statistics | `useState` + `requestAnimationFrame` or `react-number-format`         |
| Carousel (projects) | `embla-carousel-react` (lightweight, no external animation engine)    |
| Hover scale effects | Tailwind `hover:scale-105 transition-transform`                       |
| Route transition    | `<Link viewTransition>` + CSS `::view-transition` pseudo-elements     |
| Micro-interactions  | `useAnimate` with Web Animations API (e.g., button ripple, menu open) |

### Implementation Pattern 1: Scroll-Reveal with `useAnimate`

```tsx
// components/AnimatedSection.tsx
"use client";
import { useAnimate, LazyMotion, domAnimation } from "motion/react";
import { useEffect } from "react";

export function AnimatedSection({ children, className = "" }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { opacity: 1, y: 0 },
      {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // custom cubic-bezier
      },
    );
  }, [animate]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={scope}
        className={`opacity-0 translate-y-4 ${className}`}
        initial={{ opacity: 0, y: 16 }}
      >
        {children}
      </div>
    </LazyMotion>
  );
}
```

### Implementation Pattern 2: Page Transitions (Next.js 16 View Transitions API)

```css
/* app/globals.css */
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ viewTransitionName: "root" }}>
      <body className="view-transition-container">{children}</body>
    </html>
  );
}
```

### Implementation Pattern 3: Micro-Interactions

```tsx
// components/ProjectCard.tsx
export function ProjectCard({ project }) {
  const [scope, animate] = useAnimate();

  const handleHover = () => {
    animate(scope.current, { scale: 1.02 }, { duration: 0.2 });
  };

  const handleHoverEnd = () => {
    animate(scope.current, { scale: 1 }, { duration: 0.2 });
  };

  return (
    <div
      ref={scope}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      className="rounded-xl overflow-hidden bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      {/* card content */}
    </div>
  );
}
```

### Implementation Pattern 4: AnimatedCounter for Statistics

```tsx
// components/AnimatedCounter.tsx
"use client";
import { useAnimate } from "motion/react";
import { useEffect } from "react";

export function AnimatedCounter({ value }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { opacity: [0, 1], y: [20, 0] },
      {
        duration: 0.5,
      },
    );
  }, [animate]);

  return <span ref={scope}>{value}</span>;
}
```

### Animation Timing Guidelines

| Interaction         | Duration   | Easing                         | Purpose                  |
| ------------------- | ---------- | ------------------------------ | ------------------------ |
| Hover scale         | 150-200ms  | `ease-out`                     | Immediate feedback       |
| Scroll reveal       | 300-400ms  | custom cubic                   | Smooth entrance          |
| Page transition     | 250-350ms  | `cubic-bezier(0.4, 0, 0.2, 1)` | Native feel              |
| Loading spinner     | 800ms loop | `linear`                       | Perceived performance    |
| Chat message appear | 100ms      | `ease-in`                      | Snappy conversation flow |

---

## 🗺️ Page Layout Specifications

### Global Layout Structure

```
┌─────────────────────────────────┐
│ Header (Sticky, z-50)           │
│ • Logo + Nav + Lang Toggle + CTA│
├─────────────────────────────────┤
│ Main Content (Page-Specific)    │
│ • SSR/SSG/ISR rendered content  │
├─────────────────────────────────┤
│ Footer (Static)                 │
│ • Links, Contact, Social, Legal │
└─────────────────────────────────┘
```

### Header Component

```tsx
// components/Header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-montserrat font-bold text-[#003285] text-xl"
        >
          Tripax<span className="text-[#FF7F3E]">Homes</span>
        </Link>

        {/* 3-Column Header Layout */}
        <nav className="hidden md:flex items-center gap-12">
          {/* Group 1: Core */}
          <div className="flex gap-8">
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/projects">Our Projects</NavLink>
          </div>
          
          {/* Logo in Center via absolute or Flex 1 */}
          
          {/* Group 2: Interaction */}
          <div className="flex gap-8">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/contact">Get in Touch</NavLink>
          </div>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Schedule Visit
          </Button>
          <Button size="sm">View Projects</Button>
          <MobileNavToggle className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
```

### Hero Section Pattern (Homepage)

```tsx
// components/Hero.tsx
export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background: Optimized Cloudinary image with blur placeholder */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/.../hero-bg.jpg"
          alt="Tripax Homes construction site"
          fill
          className="object-cover"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..."
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003285]/90 to-[#003285]/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
          Beyond
          <br />
          <span className="bg-linear-to-r from-accent to-highlight bg-clip-text text-transparent">Excellence</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
          Premium land development & flat resale solutions in Dhaka's most
          sought-after locations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-[#FF7F3E] hover:bg-[#e66a2e]">
            Explore Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Partner With Us
          </Button>
        </div>
      </div>
    </section>
  );
}
```

### Project Card Component

```tsx
// components/ProjectCard.tsx
export function ProjectCard({ project }) {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    ongoing: "bg-orange-100 text-orange-800",
    planned: "bg-gray-100 text-gray-800",
  };

  return (
    <article className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.hero_image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge
          className={`absolute top-3 right-3 ${statusColors[project.status]}`}
        >
          {project.status}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-montserrat font-semibold text-lg text-[#003285] mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{project.location}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>{project.size_sqft?.toLocaleString()} sq ft</span>
          <span>•</span>
          <span>{project.completion_year}</span>
        </div>

        <Button variant="secondary" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </article>
  );
}
```

---

## 🎨 Page-Specific Design Highlights

### Home Page

- **Hero:** Refined minimal typography with high-contrast buttons (`white` text on gold gradient).
- **Statistics bar:** Refined spacing with a cleaner, borderless background.
- **Featured projects carousel:** Premium horizontal scrollable showcase with property titles and locations visible on hover.
- **Lead Capture:** 50/50 split layout for "Book a Private Consultation" with minimalist form card.
- **Quick navigation:** Minimalist grid links using the brand green for backgrounds.

### About Us Page

- Founder's vision, company story, and visual vertical timeline.
- Grid layouts highlighting core values (Quality, Safety, Integrity, Innovation).
- Leadership team profiles with photos, bios, and LinkedIn links.
- Accreditation logos (REHAB, RAJUK, etc.).

### Projects / Portfolio Page

- **Dynamic Filters:** By Status (Completed/Ongoing/Upcoming), By Type (Residential/Commercial/Industrial), and By Location.
- **Project Cards:** Lazy-loaded Cloudinary images, hover effects, size (sq ft), and completion status.
- **Case Study Pages:** Hero image + specs table, photo gallery (lightbox), downloadable brochure CTA.

### Services Page

- Grids for sector specialization (Residential, Commercial, Industrial, Infrastructure).
- Descriptions for Design/Architecture, Project Management, and Consultation.
- Walkthrough for the Joint-Venture Landowner partnership model.

### Contact Page

- **Two-column layout:** Left – form (Name, Email, Phone, Project Type dropdown, Message). Right – office info, Google Maps iframe (lazy-loaded), WhatsApp click-to-chat.
- **Map fallback:** Static map image if user declines third-party scripts.

### FAQ Page

- Search functionality with quick filtering by keyword.
- Accordion layouts for joint-venture percentages, building timelines, and legalities.

### Admin Panel (Dashboard)

- **Sidebar navigation:** Content manager (Projects, Team, Services, FAQ), Media library (Cloudinary), Inquiry viewer.
- **Form inputs:** Rich text editor (TipTap or MDX) for project descriptions.
- **Image upload:** Drag-and-drop zone that calls the server-side upload action. Preview before saving.
- **Data tables:** Shadcn table with sorting, pagination, and inline edits.

---

## 📁 Imagery & Media (Cloudinary)

All images are served via Cloudinary with automatic format selection (`f_auto`) and quality optimization (`q_auto`).

### Image Optimization Settings

- **Breakpoint-aware:** `srcSet` generated by `next/image` + Cloudinary URL API
- **Lazy loading:** Native `loading="lazy"` for below-fold images, `eager` for hero
- **Placeholders:** Blur-up CSS or low-quality image placeholder (LQIP) from Cloudinary `e_blur:1000`
- **Admin uploads:** Server-signed uploads only; no direct browser uploads (see Gatekeeper security architecture)

### Cloudinary Folder Structure

```text
tripax/
├── projects/
│   ├── [project-id]/
│   │   ├── hero/
│   │   ├── gallery/
│   │   └── floorplans/
├── team/           # Leadership photos
├── certifications/ # Badge images
└── marketing/      # Banners, hero images
```

### Image Optimization Best Practices

```tsx
// Always use these props for responsive images
<Image
  src={cloudinaryUrl}
  alt={alt}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  placeholder="blur"
  blurDataURL={blurPlaceholder}
  className="object-cover"
/>
```

---

## 📱 Responsive Design Guidelines

### Responsive Breakpoints (Tailwind v4)

```css
/* Mobile-first approach */
sm: 640px   /* Small tablets, large phones */
md: 768px   /* Tablets, small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large displays */
```

### Mobile-First Breakpoint Strategy

```tsx
// Example: Responsive grid for projects
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

### Touch Target Minimums

| Element          | Minimum Size          | Implementation              |
| ---------------- | --------------------- | --------------------------- |
| Buttons          | 44×44px               | `min-h-[44px] min-w-[44px]` |
| Links            | 44×44px touch area    | `p-2 -m-2` for hit area     |
| Form inputs      | 44px height           | `h-11` or `h-12`            |
| Navigation items | 44px vertical padding | `py-3` minimum              |

### Dark Mode Strategy

> ⚠️ **Note:** Tripax brand guidelines specify light-mode-first design. Dark mode is optional and should not compromise brand color integrity.

If implemented:

- Use `class` strategy (not `media`) for explicit control
- Preserve primary brand colors; only adjust backgrounds/text contrast
- Test all CTAs for accessibility in both modes

---

## ♿ Accessibility Standards (WCAG 2.1 AA)

### Mandatory Checks

- [ ] All images have descriptive `alt` text (decorative images: `alt=""`)
- [ ] Form inputs have associated `<label>` or `aria-label`
- [ ] Interactive elements are keyboard-focusable with visible focus rings
- [ ] Color is not the sole means of conveying information
- [ ] Page has logical heading hierarchy (`h1` → `h2` → `h3`)
- [ ] `lang="en"` attribute on `<html>`; `lang="bn"` for Bengali content sections
- [ ] Skip-to-content link for keyboard users
- [ ] ARIA live regions for dynamic content (chatbot, form submissions)

### Focus Management Example

```tsx
// components/MobileNav.tsx
export function MobileNav({ isOpen, onClose }) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstFocusRef.current?.focus();

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          // Trap focus within nav
          if (e.shiftKey && document.activeElement === firstFocusRef.current) {
            e.preventDefault();
            lastFocusRef.current?.focus();
          } else if (
            !e.shiftKey &&
            document.activeElement === lastFocusRef.current
          ) {
            e.preventDefault();
            firstFocusRef.current?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeydown);
      return () => document.removeEventListener("keydown", handleKeydown);
    }
  }, [isOpen]);

  // ... render
}
```

### Keyboard Navigation

- **All interactive elements** are focusable with clearly visible focus rings (`ring-2 ring-offset-2`)
- **Skip-to-content link** positioned at top-left for keyboard users
- **Focus traps** implemented in modals (chatbot, mobile nav)
- **Tab order** maintains logical flow through page content

### Screen Reader Support

- **ARIA landmarks:** `<main>`, `<nav>`, `<aside>`, `<footer>`
- **Alt text:** Descriptive for images, empty for decorative
- **ARIA labels:** For icon-only buttons (e.g., close, menu toggle)
- **ARIA live regions:** For dynamic content (form validation, chat messages)

### Reduced Motion Respect

All animations check `prefers-reduced-motion` and disable non-critical animations for users with motion sensitivity.

---

## 🧪 Design QA Checklist

### Visual Regression

- [ ] Hero section renders correctly on 320px–1920px viewports
- [ ] Project cards maintain aspect ratio across breakpoints
- [ ] Color contrast passes WCAG AA for all text/background combos
- [ ] Typography scale is consistent (no accidental `text-base` in headings)

### Interaction Testing

- [ ] All buttons show hover/focus/active states
- [ ] Form validation messages are clear and accessible
- [ ] Mobile nav toggle works with keyboard and screen readers
- [ ] Chatbot widget is dismissible and re-openable

### Performance-Aware Design

- [ ] No layout shift from images/fonts (reserved space, `next/font`)
- [ ] Animated elements use `will-change` sparingly
- [ ] Lazy-loading applied to below-fold images and components
- [ ] Lighthouse accessibility score ≥ 95 in CI

### Design System Compliance

- [ ] Colors match Tripax brand guidelines (#003285, #2A629A, #FF7F3E, #FFDA78)
- [ ] Typography uses Montserrat/Inter and falls back to system fonts
- [ ] All interactive elements have hover/focus/active states
- [ ] Mobile menu tested on actual device (iOS/Android)
- [ ] Images load progressively and are optimized (Cloudinary)
- [ ] Animations do not block main thread and respect reduced motion
- [ ] Forms validate clearly and provide success/error feedback
- [ ] Chatbot widget is accessible and does not overlap critical content
- [ ] Page transitions feel smooth (View Transitions API)

---

## 🎯 Design Principle

Every visual decision should serve Tripax's core value proposition: **Trust, Quality, and Partnership**.

**When in doubt, choose clarity over decoration.**

---

> **Document Version History**
>
> - v3.0 (April 2, 2026) – Consolidated from design-deepseek.md, design-gemini.md, and design-qwen.md
> - Merged best practices from all three design system versions
> - Added comprehensive code examples and implementation patterns
> - Emphasis on accessibility, performance, and mobile-first responsive design
