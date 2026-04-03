# 📄 Product Requirements Document (PRD) — FINAL

## Tripax Homes Ltd. Corporate Website & CMS

**Version:** 3.0 | **Status:** Approved for Development  
**Target Release:** Q3 2026 | **Last Updated:** April 3, 2026  
**🔄 Highlights:** Forest Green & Gold Rebrand + Horizontal Projects Carousel + Private Consultation CTA

---

## 📖 1. Executive Summary

Tripax Homes Ltd. is a Bangladeshi "Builder" company specializing in **land development with revenue-sharing models** and **premium flat resales** in Dhaka. This PRD outlines the architecture, features, and technical requirements for a high-performance, SEO-optimized corporate website paired with a headless admin CMS.

**🔐 Key Architectural Shift:** This version adopts a **"Gatekeeper" security model** where Next.js Server Actions act as the sole trusted layer, holding all privileged credentials (Supabase Service Role Key, Cloudinary API Secret). This enables a **zero-configuration security posture** at the provider level while maintaining enterprise-grade protection through server-side validation and JWT-based admin authentication.

**🤖 AI Enhancement:** Integration of **Gemini 2.5 Flash** via Vercel AI SDK for a cost-effective, low-latency, context-aware construction assistant chatbot that qualifies leads 24/7.

---

## 👥 2. Target Audience & Personas

| Persona                         | Goal                                                   | Key Touchpoints                               |
| ------------------------------- | ------------------------------------------------------ | --------------------------------------------- |
| **Landowner**                   | Monetize idle land via construction & profit-sharing   | Services, Contact Form, Chatbot, Case Studies |
| **Flat Buyer**                  | Find secure, well-located apartments in Dhaka          | Projects Portfolio, Filters, WhatsApp CTA     |
| **Corporate/Commercial Client** | Lease/buy commercial spaces, partner on infrastructure | Services, About, Admin-generated Lead Routing |
| **Internal Admin/Marketing**    | Update projects, stats, content, track inquiries       | `/admin` CMS Dashboard, Inquiry Tracking      |

---

## 🛠️ 3. Tech Stack & Architecture

### 3.1 Core Stack

| Layer              | Technology                       | Purpose                                                                |
| ------------------ | -------------------------------- | ---------------------------------------------------------------------- |
| **Framework**      | Next.js `16.2+` (App Router)     | Full-stack SSR/SSG, routing, View Transitions, Server Actions          |
| **UI/Runtime**     | React Compiler `stable:19.2+`    | Zero-runtime optimization, automatic memoization                       |
| **Styling**        | Tailwind CSS `4.2+`              | CSS-first, JIT, native design tokens                                   |
| **UI Components**  | shadcn/ui `4.1+`                 | Accessible, unstyled primitives, Radix-backed                          |
| **Animations**     | `motion/react` `12.38+`          | Tree-shakeable, Web Animations API, `useAnimate`                       |
| **Database/Auth**  | Supabase `2.101+`                | PostgreSQL, **RLS enabled but no policies** (bypassed via service key) |
| **Media/CDN**      | Cloudinary (Latest SDK)          | `@cloudinary/url-gen` + **server-signed uploads only**                 |
| **Hosting/Edge**   | Vercel (Latest)                  | Serverless Functions, ISR, Edge Middleware for JWT auth                |
| **AI Chatbot**     | Vercel AI SDK + `@ai-sdk/google` | **Gemini 2.5 Flash** streaming, context-aware RAG                      |
| **Forms/Tracking** | React Hook Form + Zod + Resend   | Validation, server actions, email routing                              |

### 3.2 🚨 "Gatekeeper" Security Architecture

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│   Client (Browser)   │     │  Next.js Server     │     │   External Services  │
│                      │     │  (Gatekeeper)       │     │                      │
│ • Public Routes      │────▶│ • Server Actions    │────▶│ • Supabase          │
│ • /admin (JWT req.)  │     │ • Middleware (JWT)  │     │   - Service Role Key│
│ • Chat UI            │     │ • Signed Uploads    │     │   - RLS: ON, Policies: NONE │
│                      │     │ • AI Stream Handler │     │ • Cloudinary        │
└─────────────────┘     │     │ • Env Vars (Secret) │     │   - API Secret      │
                        │     └─────────────────────┘     │   - Upload Presets: DISABLED │
                        │                                  └─────────────────┘
                        │
                        ▼
            ┌─────────────────────┐
            │  Security Boundaries │
            │                      │
            │ ✅ Service keys NEVER leave server │
            │ ✅ All admin ops require JWT       │
            │ ✅ Cloudinary uploads signed server-side │
            │ ✅ Supabase RLS bypassed ONLY via service key │
            │ ✅ Middleware redirects unauth /admin │
            └─────────────────────┘
```

#### 3.2.1 Supabase Security Strategy

| Setting                     | Value                   | Rationale                                                             |
| --------------------------- | ----------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`  | Exposed                 | Required for anon client (public reads only)                          |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only env var** | Bypasses RLS; used ONLY in `lib/supabase-admin.ts`                    |
| RLS on Tables               | **ENABLED**             | Defense-in-depth; blocks direct anon access                           |
| RLS Policies                | **NONE CREATED**        | Effectively locks all tables except via service key                   |
| Client Supabase Instance    | Anon key only           | Public pages can only read allowed data (if any policies added later) |

**Server-Side Supabase Client (`lib/supabase-admin.ts`):**

```typescript
// ⚠️ This file MUST have "use server" or be imported only in Server Actions
"use server";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 🔐 Never exposed to client
);
```

#### 3.2.2 Cloudinary Security Strategy

| Setting                             | Value                   | Rationale                                                 |
| ----------------------------------- | ----------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Exposed                 | Required for public image URLs                            |
| `CLOUDINARY_API_KEY`                | Server-only             | Used for signed upload requests                           |
| `CLOUDINARY_API_SECRET`             | **Server-only env var** | 🔐 Never exposed; used ONLY in server actions             |
| Upload Presets                      | **DISABLED**            | All uploads must be signed server-side                    |
| Folder Restrictions                 | Optional                | Can enforce `/projects`, `/team` folders via server logic |

**Server-Side Upload Action (`app/actions/upload.ts`):**

```typescript
"use server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdminSession } from "@/lib/auth"; // Supabase session verify

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // 🔐 Server-only
});

export async function uploadProjectPhoto(formData: FormData) {
  // 1️⃣ Verify admin session first
  const session = await verifyAdminSession();
  if (!session) throw new Error("Unauthorized");

  // 2️⃣ Process file
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 3️⃣ Signed upload to Cloudinary
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "tripax/projects", resource_type: "auto" },
        (error, result) => (error ? reject(error) : resolve(result)),
      )
      .end(buffer);
  });

  return (result as any).secure_url;
}
```

#### 3.2.3 Admin Authentication Layer (Supabase Auth + Session Middleware)

**Flow:**

1. Admin logs in via `/login` → Server calls `supabase.auth.signInWithPassword()` → Supabase issues session → Sets `httpOnly; Secure; SameSite=Strict` cookie automatically
2. Next.js Middleware (`middleware.ts`) intercepts `/admin/*` routes → Validates session via `supabase.auth.getSession()` → Allows/Redirects
3. Server Actions verify session via `verifyAdminSession()` and RLS policies enforce access using `auth.uid()` claim

**Middleware Example (`middleware.ts`):**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = { matcher: ["/admin/:path*", "/api/:path*"] };
```

**⚠️ Critical Safety Rules:**

- ❌ **NEVER** import `supabase-admin.ts` or Cloudinary config in any file without `'use server'`
- ❌ **NEVER** log or expose `SUPABASE_SERVICE_ROLE_KEY` or `CLOUDINARY_API_SECRET`
- ✅ **ALWAYS** verify session in Server Actions before database/media operations
- ✅ **ENABLE** RLS on all Supabase tables with policies using `auth.uid()` for fine-grained access control
- ✅ **DISABLE** Cloudinary unsigned upload presets in dashboard

---

## 🎨 4. Design System & UI Guidelines

### 4.1 Color Palette

- **Primary Forest Green:** `#11261A` [rgb(17, 38, 26)] — Premium stability, nature
- **Signature Gold:** `#F2CD13` [rgb(242, 205, 19)] — Luxury, success, accents
- **Soft Highlight:** `#D9D059` [rgb(217, 208, 89)] — Elegant secondary accents
- **Minimalist White:** `#FFFFFF` [rgb(255, 255, 255)] — Clean architectural space

### 4.2 Typography

- **Headings:** Montserrat (Bold, geometric, clean, screams architecture)
- **Body:** Plus Jakarta Sans (Contemporary, premium aesthetics)

### 4.3 Animation & Motion Strategy

- **imports:** Must use `motion/react` instead of `framer-motion` for React 19 compatibility
- **Hooks:** Use `useAnimate` for browser-native Web Animations API execution
- **Lazy Loading:** All animated sections must be wrapped in `<LazyMotion>` to maintain A+ SEO rating
- **Page Transitions:** Next.js 16 Native View Transitions API (CSS/Browser driven, zero JS overhead)

---

## 🗺️ 5. Page Specifications & Routing

| Route                       | Type          | Components                                       | Data Source                                                 | Security Notes                                              |
| --------------------------- | ------------- | ------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `/`                         | SSR           | Hero, Stats, Featured Carousel, Quick Nav, CTAs  | Supabase (anon key)                                         | Public read-only                                            |
| `/about`                    | SSG           | Company Story, Mission/Vision, Values, Team Grid | Supabase (anon key)                                         | Public read-only                                            |
| `/projects`                 | ISR           | Filters, Grid, Project Cards                     | Supabase (anon key)                                         | Public read-only                                            |
| `/projects/[slug]`          | SSG           | Gallery, Specs, Timeline, CTA                    | Supabase (anon key) + Cloudinary (public URLs)              | Public read-only                                            |
| `/services`                 | SSG           | Service Categories, Capabilities                 | Supabase (anon key)                                         | Public read-only                                            |
| `/contact`                  | RSC           | Multi-channel CTA, Map, Form, Office Hours       | Server Action for writes                                    | Form submissions via Server Action                          |
| `/faq`                      | ISR           | Search, Accordion                                | Supabase (anon key)                                         | Public read-only                                            |
| `/privacy-policy`, `/terms` | SSG           | Legal Text                                       | Static/MDX                                                  | Public                                                      |
| `/admin/*`                  | RSC           | Auth Gate, Dashboard, CRUD, Media Manager        | **Supabase (service key)**, **Cloudinary (signed uploads)** | 🔐 JWT required via Middleware + Server Action verification |
| `/login`                    | RSC           | Admin login form                                 | Server Action (credential check)                            | Issues JWT cookie on success                                |
| `/api/chat`                 | Server Action | AI Chat Stream                                   | Vercel AI SDK + Gemini 2.5 Flash                            | Public access allowed with rate limiting                    |

### 5.1 Detailed Page Specifications

#### Home Page

- **Hero Section:** Dynamic tagline, mission statement, high-fidelity project visual background
- **Key Statistics:** Animated counter for Years in Business, Projects Completed, Clients Served
- **Featured Projects:** Premium horizontal scrollable carousel showcasing flagship properties with snap-scroll and overlay metadata
- **Private Consultation CTA:** 50/50 split lead-capture section with minimalist branding and form
- **Quick Navigation:** Minimalist grid-style quick links to key site areas
- **Primary CTAs:** Sticky/Floating CTA for "View Projects", "Contact Us", "Schedule Visit"

#### About Us Page

- **Story & Milestones:** Founders' vision, founding year, visual vertical timeline
- **Mission & Vision:** Clean card layouts detailing company goals
- **Core Values:** Grid layout highlighting Quality, Safety, Integrity, Innovation
- **Leadership Team:** Profiles with photos, bios, LinkedIn links
- **Accreditations:** Logos of REHAB, RAJUK, construction certifications

#### Projects/Portfolio Page

- **Dynamic Filtering:** By Status (Completed, Ongoing, Upcoming) | By Type (Residential, Commercial, Industrial) | By Location (Gulshan, Banani, Dhanmondi, etc.)
- **Project Cards:** Lazy-loaded Cloudinary images, hover effects, name, location, size (sq ft), status, "Learn More"
- **Project Case Studies:** Deep-dive pages with floor plans, neighborhood perks, construction update logs

#### Services Page

- **Sector Specialization:** Grids for Residential, Commercial, Industrial, Infrastructure
- **Core Offerings:** Design/Architecture, Project Management, Consultation
- **Differentiator:** Joint-Venture Landowner partnership walkthrough
- **After-Sales Services:** Highlighted maintenance and retention services

#### Contact Page

- **Multi-Channel Reach:** WhatsApp click-to-chat, active phone lines, email mailto links
- **Interactive Maps:** Google Maps iframe centered on Gulshan-2 office
- **Smart Contact Form:** Name, Email, Phone, Message, Project Type (Landowner or Flat Buyer)

#### FAQ Page

- **Accordion Layout:** Common queries on joint-venture percentages, building timelines, booking legalities
- **Search Functionality:** Quick filtering by keyword

#### Legal Pages

- **Privacy Policy & Terms of Service:** Standard templates, legally binding in Bangladesh jurisdictions

---

## 🤖 6. AI Chatbot Integration – Gemini 2.5 Flash

### 6.1 Architecture

- **Model:** `gemini-2.5-flash` (Google AI Studio) — optimized for speed, cost, and agentic reasoning
- **Framework:** Vercel AI SDK (`ai`, `@ai-sdk/google`)
- **Context:** RAG pipeline using Supabase `pgvector` (ingests: Services, Projects, FAQ, Land Development terms, Contact routing)
- **UI:** shadcn `Dialog`/`Sheet`-based floating widget, streaming responses, message history
- **Safety:** Prompt injection filtering, Bangladesh real-estate compliance disclaimers, human handoff trigger

### 6.2 Environment Setup

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_2_5_flash_key
# Optional for RAG
SUPABASE_VECTOR_API_KEY=your_key
```

### 6.3 Dependencies

```bash
npm install ai @ai-sdk/google
```

### 6.4 Server Action: Chat Engine (`app/actions/chat.ts`)

```typescript
"use server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { supabaseAdmin } from "@/lib/supabase-admin"; // For RAG context

export async function generateChatResponse(
  messages: any[],
  userContext?: { isAdmin?: boolean },
) {
  // Optional: Enrich with RAG context from Supabase
  const ragContext = userContext?.isAdmin
    ? await fetchAdminKnowledgeBase()
    : await fetchPublicKnowledgeBase();

  const result = await streamText({
    model: google("gemini-2.5-flash"), // 🚀 High-speed, cost-effective
    messages,
    system: `You are a professional construction assistant for Tripax Homes Ltd., a Dhaka-based builder specializing in land development partnerships and flat sales. 
    ${ragContext}
    Always respond in English unless the user writes in Bengali. Never provide legal/financial advice. For site visits, collect name, phone, and preferred location.`,
    temperature: 0.3, // Factual, professional tone
  });

  return createStreamableValue(result.textStream).value;
}
```

### 6.5 Client Component: Chat UI (`components/Chatbot.tsx`)

```tsx
"use client";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat", // Route handler that calls generateChatResponse
      onResponse: (res) => {
        if (res.status === 429) alert("Too many requests. Please wait.");
      },
    });

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg bg-[#FF7F3E] hover:bg-[#e66a2e]"
        aria-label="Open chat"
      >
        💬
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 p-4 bg-white shadow-2xl rounded-xl border border-gray-200 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-[#003285]">Tripax Assistant</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          ✕
        </Button>
      </div>

      <div className="h-64 overflow-y-auto mb-4 space-y-2 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`p-2.5 rounded-lg text-sm max-w-[85%] ${
                m.role === "user"
                  ? "bg-[#2A629A] text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
        {isLoading && <p className="text-xs text-gray-400 italic">Typing...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about projects, land partnerships..."
          className="flex-1 text-sm"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !input.trim()}
          className="bg-[#FF7F3E]"
        >
          Send
        </Button>
      </form>

      <p className="text-[10px] text-gray-400 mt-2 text-center">
        AI responses may not be perfect. For urgent matters, call +880 XXX-XXXX.
      </p>
    </div>
  );
}
```

### 6.6 Why Gemini 2.5 Flash?

| Factor                | Benefit for Tripax                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| **Cost Efficiency**   | ~60% cheaper than Gemini Pro; ideal for high-volume public chat                                        |
| **Low Latency**       | <500ms response time; critical for mobile users on job sites                                           |
| **Agentic Reasoning** | Can handle multi-step queries: _"Show me 3BHK flats in Gulshan under 2 crore with possession in 2026"_ |
| **Multilingual**      | Native Bengali understanding + English output flexibility                                              |
| **Context Window**    | 128K tokens; can ingest full project catalogs for accurate RAG                                         |

---

## ⚡ 7. Technical & Performance Requirements

| Metric                | Target                        | Implementation                                                                       |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| **LCP**               | < 1.5s                        | Next.js Image optimization, Cloudinary `quality: auto`, critical CSS, React Compiler |
| **FID/INP**           | < 50ms                        | `useAnimate` (~2kb), debounced handlers, worker-based validation                     |
| **CLS**               | < 0.05                        | Reserved media ratios, `next/font`, font fallback metrics                            |
| **Bundle Size**       | < 150kb initial               | Tree-shaking `motion/react`, route segmentation, dynamic imports for chatbot/maps    |
| **Caching**           | ISR + Edge Cache              | `revalidate: 3600`, stale-while-revalidate, Vercel KV for rate limits                |
| **Serverless Limits** | < 300ms cold start            | Edge Functions, Supabase connection pooling, compiled React tree                     |
| **Security Audit**    | Zero critical vulnerabilities | SAST/DAST scans, dependency checks, manual penetration testing pre-launch            |

**Next.js Config Essentials (`next.config.ts`):**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    reactCompiler: true,
    serverActions: {
      allowedOrigins: ["localhost:3000", "tripaxhomes.com"], // CSRF protection
    },
  },
  serverExternalPackages: [
    "@supabase/supabase-js",
    "cloudinary",
    "@ai-sdk/google",
  ],
  env: {
    // Public vars
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};

export default nextConfig;
```

---

## 🔒 8. Security & Compliance

### 8.1 Defense-in-Depth Strategy

| Layer        | Control                              | Implementation                                                                |
| ------------ | ------------------------------------ | ----------------------------------------------------------------------------- |
| **Network**  | HTTPS + HSTS                         | Vercel default + `next-secure-headers`                                        |
| **Auth**     | JWT + httpOnly Cookies               | Middleware + Server Action verification                                       |
| **Database** | RLS + Service Key Isolation          | Supabase RLS enabled, no policies; service key only in server actions         |
| **Media**    | Signed Uploads Only                  | Cloudinary API secret server-only; no unsigned presets                        |
| **API**      | Rate Limiting + Input Validation     | Vercel KV for rate limits; Zod for all Server Action inputs                   |
| **AI**       | Prompt Guardrails + Output Filtering | System prompt constraints; post-generation sanitization                       |
| **Audit**    | Logging + Monitoring                 | Supabase audit logs for admin actions; Server-side error tracking |

### 8.2 Environment Variable Classification

| Variable                            | Scope           | Purpose                  | Security Level  |
| ----------------------------------- | --------------- | ------------------------ | --------------- |
| `NEXT_PUBLIC_SUPABASE_URL`          | Client + Server | Supabase endpoint        | 🔓 Public       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Client + Server | Supabase Auth client key | 🔓 Public       |
| `SUPABASE_SERVICE_ROLE_KEY`         | **Server Only** | Bypass RLS for admin ops | 🔐🔐🔐 Critical |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Client + Server | Image URL generation     | 🔓 Public       |
| `CLOUDINARY_API_KEY`                | Server Only     | Signed upload requests   | 🔐🔐 High       |
| `CLOUDINARY_API_SECRET`             | **Server Only** | Signing upload requests  | 🔐🔐🔐 Critical |
| `GOOGLE_GENERATIVE_AI_API_KEY`      | Server Only     | Gemini API access        | 🔐🔐 High       |

**🚨 Deployment Checklist for Security:**

- [ ] Verify `SUPABASE_SERVICE_ROLE_KEY` is NOT in any client bundle (use `next build` analysis)
- [ ] Confirm Cloudinary dashboard has **no unsigned upload presets** enabled
- [ ] Test that direct Supabase anon key queries to `projects` table return ONLY intended public data
- [ ] Validate Supabase Auth session middleware redirects unauthenticated `/admin` access
- [ ] Verify RLS policies use `auth.uid()` and correctly enforce admin-only writes
- [ ] Test login/logout flows and session persistence across page reloads
- [ ] Run `npm audit` and `snyk test` pre-deploy
- [ ] Enable Vercel Security Headers: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`

---

## 📅 9. Development Phases & Timeline

| Phase                                | Duration | Deliverables                                                                   | Security/AI Focus                    |
| ------------------------------------ | -------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| **1. Discovery & Architecture**      | 1 wk     | Supabase schema, component map, **Gatekeeper security design**, JWT flow       | Threat modeling, env var strategy    |
| **2. UI Foundation**                 | 2 wks    | shadcn setup, typography, responsive grid                                      | —                                    |
| **3. Core Pages & Content**          | 3 wks    | Home, About, Services, Contact, FAQ, Legal                                     | Public data fetching via anon key    |
| **4. Projects Portfolio**            | 2 wks    | Filters, case studies, **Cloudinary public URL integration**                   | —                                    |
| **5. Admin Panel & Gatekeeper**      | 2.5 wks  | Supabase Auth, Middleware, **Server Actions for Supabase/Cloudinary**, CRUD UI | 🔐 Service key + RLS policy testing  |
| **6. AI Chatbot (Gemini 2.5 Flash)** | 1.5 wks  | Vercel AI SDK integration, RAG pipeline, streaming UI, safety filters          | 🤖 Prompt engineering, rate limiting |
| **7. Animations & View Transitions** | 1 wk     | `LazyMotion`, `useAnimate`, route transitions                                  | —                                    |
| **8. QA, Security Audit & Deploy**   | 1.5 wks  | Lighthouse, penetration testing, env var audit, staging → prod                 | 🔐 Final security sign-off           |

**Total:** ~14.5 Weeks _(+0.5 wk for security hardening)_

---

## 📊 10. Success Metrics & KPIs

| KPI                          | Target                     | Measurement                               |
| ---------------------------- | -------------------------- | ----------------------------------------- |
| Core Web Vitals (All Green)  | 90+ Lighthouse             | Lighthouse CI in PR checks                |
| Admin Content Update Time    | < 5 minutes per section    | User testing with marketing team          |
| Lead Conversion Rate         | ≥ 4.5%                     | Supabase `leads` table + GA4              |
| **Chatbot Resolution Rate**  | ≥ 70% (pre-handoff)        | Vercel AI SDK logs + manual review        |
| **Security Incidents**       | 0 critical vulnerabilities | Snyk/DAST scans + penetration test report |
| Organic Traffic Growth (MoM) | +15% first 6 months        | GA4 + Search Console                      |
| Uptime/SLA                   | 99.95%                     | Vercel + Supabase status pages            |

---

## ✅ 11. Final Checklist Validation

- [x] Clear value proposition on homepage
- [x] Professional, high-quality images (Cloudinary optimized, **server-signed uploads**)
- [x] Mobile-responsive design (Tailwind v4 mobile-first)
- [x] Fast loading speed (React Compiler, `useAnimate`, ISR, Cloudinary CDN)
- [x] Easy navigation menu (shadcn Sheet + sticky header + skip links)
- [x] Multiple contact options (Phone, Email, WhatsApp, Form)
- [x] Project portfolio with filters (Status/Type/Location + case studies)
- [x] About us with team photos (Supabase CMS + Cloudinary)
- [x] Service descriptions (Sector + capabilities grid)
- [x] Call-to-action on every page (Primary/Secondary buttons, chat, forms)
- [x] SEO-optimized content (JSON-LD, metadata, sitemaps, semantic HTML)
- [x] Social media integration (Links, OG tags, Pixel/GA config)
- [x] Google Maps location (Lazy-loaded iframe + fallback static map)
- [x] Privacy policy & terms (Dynamic CMS + static fallback)
- [x] SSL certificate (HTTPS) (Vercel default + HSTS headers)
- [x] **🔐 Gatekeeper Security Model implemented** (Service keys server-only, JWT admin auth)
- [x] **🤖 Gemini 2.5 Flash chatbot integrated** (Streaming, RAG, safety filters)
- [x] **🛡️ Zero-configuration provider security** (Supabase RLS enabled/no policies, Cloudinary unsigned uploads disabled)

---

## 📎 Appendix: Supabase Schema & Cloudinary Folder Structure

### Database Schema

```sql
-- Projects (RLS ENABLED, but NO POLICIES defined)
-- 🔐 Only accessible via supabaseAdmin (service key) for writes
-- ✅ Public reads allowed ONLY if future policies added (currently none)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  type_enum TEXT CHECK (type_enum IN ('residential', 'commercial', 'industrial')),
  status_enum TEXT CHECK (status_enum IN ('completed', 'ongoing', 'planned')),
  size_sqft INTEGER,
  completion_year INTEGER,
  description TEXT,
  featured_order INTEGER DEFAULT 999,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- ⚠️ NO CREATE POLICY statements = no public access via anon key

-- Project Images
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  cloudinary_url TEXT NOT NULL, -- Public URL from Cloudinary
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Leads (writes via Server Action only)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  inquiry_type_enum TEXT CHECK (inquiry_type_enum IN ('flat_purchase', 'land_development', 'commercial', 'other')),
  message TEXT,
  source TEXT DEFAULT 'website',
  status_enum TEXT DEFAULT 'new' CHECK (status_enum IN ('new', 'contacted', 'qualified', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 🔐 Insert via Server Action using supabaseAdmin; no public write policies

-- Team Members
CREATE TABLE team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_cloudinary_url TEXT,
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Cloudinary Folder Structure

```
tripax/
├── projects/       # Auto-created by server upload action
│   ├── [project-id]/
│   │   ├── hero/
│   │   ├── gallery/
│   │   └── floorplans/
├── team/          # Leadership photos
├── certifications/  # Badge images
└── marketing/      # Banners, hero images
```

---

## 📋 Non-Functional Requirements

| Category                  | Requirement                                                                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Performance**           | LCP < 1.5s, FID/INP < 50ms, CLS < 0.05. Achieved via Next.js SSR, image optimisation (Cloudinary), React Compiler, and lazy‑loading animations.                                                      |
| **SEO**                   | All pages have editable meta tags. URLs are SEO‑friendly. JSON-LD schema for local business and real estate. Content optimised for local keywords (e.g., "best builder in Gulshan").                 |
| **Security**              | HTTPS enforced. Supabase RLS enabled with zero policies (only server access). Cloudinary API secret never exposed. JWT stored in `httpOnly` cookie to prevent XSS. Middleware protects admin routes. |
| **Accessibility**         | WCAG 2.1 Level AA compliant. Semantic HTML, ARIA labels, keyboard navigation.                                                                                                                        |
| **Mobile‑Responsiveness** | Full responsive design using Tailwind's mobile‑first utilities. Tested on iOS Safari, Chrome Mobile, Samsung Internet.                                                                               |

---

**Prepared for:** Tripax Homes Ltd. Development Team  
**Security Sign-off Required Before Phase 5**  
**Next Steps:**

1. ✅ Approve Gatekeeper architecture & JWT flow
2. ✅ Initialize repo with security-first `.env.example`
3. ✅ Set up Supabase project: enable RLS, create tables, **do not add policies**
4. ✅ Configure Cloudinary: disable unsigned presets, note API credentials
5. ✅ Begin UI foundation sprint with security linting rules enabled

_Document ends. Ready for engineering kickoff with security-first mindset._ 🔐🚀
