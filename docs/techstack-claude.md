# ⚙️ Tripax Homes Ltd. — Technology Stack & Architecture

**Version:** 2.1 | **Status:** Finalized | **Last Updated:** April 3, 2026  
**Project:** Corporate Website & CMS | **Security Model:** Gatekeeper Pattern  
**AI Engine:** Gemini 2.5 Flash | **Target Release:** Q2 2026

---

## 🏗️ High-Level Architecture

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│   Client        │     │   Next.js Server    │     │   External      │
│   (Browser)     │────▶│   (Gatekeeper)      │────▶│   Services      │
│                 │     │                     │     │                 │
│ • Public Routes │     │ • Server Actions    │     │ • Supabase      │
│ • /admin*       │     │ • Proxy Auth        │     │   - Service Key │
│ • Chat UI       │     │ • Signed Uploads    │     │   - RLS: ON     │
│                 │     │ • AI Stream Handler │     │   - auth.uid()  │
└─────────────────┘     │ • Env Vars (Secret) │     │ • Cloudinary    │
                        │                     │     │   - API Secret  │
                        └─────────────────────┘     │ • Google AI     │
                                                    └─────────────────┘
```

### Key Architectural Decisions

| Decision                                 | Rationale                                                                           | Impact                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Next.js App Router + Server Actions**  | Unified full-stack framework; zero-API data mutations; built-in streaming           | Simplified codebase, better DX, native RSC support            |
| **Gatekeeper Security Model**            | Centralize privileged operations in server; avoid complex provider-side policies    | Faster setup, easier auditing, single point of security logic |
| **Supabase RLS Enabled + Zero Policies** | Defense-in-depth: blocks accidental public writes even if server logic fails        | Prevents data leaks; service key is only escape hatch         |
| **Cloudinary Signed Uploads Only**       | Prevent unauthorized media uploads; full server control over folder/transform rules | Eliminates dashboard misconfiguration risks                   |
| **Gemini 2.5 Flash via Vercel AI SDK**   | Cost-effective, low-latency AI with agentic reasoning for lead qualification        | 24/7 lead capture without human overhead                      |

---

## 📦 Core Technology Stack

### Framework & Runtime

| Package      | Version   | Purpose                                               | Installation                   |
| ------------ | --------- | ----------------------------------------------------- | ------------------------------ |
| `next`       | `^16.2.2` | App Router, SSR/ISR, Server Actions, View Transitions | `npm install next@latest`      |
| `react`      | `^19.2.0` | UI library with Compiler optimizations                | `npm install react@latest`     |
| `react-dom`  | `^19.2.0` | React DOM bindings                                    | `npm install react-dom@latest` |
| `typescript` | `^5.4.0`  | Type safety, better DX                                | `npm install -D typescript`    |

### Styling & UI Components

| Package                    | Version  | Purpose                                      | Installation                           |
| -------------------------- | -------- | -------------------------------------------- | -------------------------------------- |
| `tailwindcss`              | `^4.2.0` | Utility-first CSS, JIT, native design tokens | `npm install tailwindcss@latest`       |
| `@tailwindcss/postcss`     | `^4.2.0` | PostCSS plugin for Tailwind v4               | `npm install @tailwindcss/postcss`     |
| `shadcn/ui`                | `^4.1.0` | Accessible, unstyled component primitives    | `npx shadcn@latest init`               |
| `class-variance-authority` | `^0.7.0` | Component variant utilities (for shadcn)     | `npm install class-variance-authority` |
| `clsx` + `tailwind-merge`  | `^2.5.0` | Conditional class merging                    | `npm install clsx tailwind-merge`      |

### Animation & Motion

| Package          | Version    | Purpose                                       | Installation                |
| ---------------- | ---------- | --------------------------------------------- | --------------------------- |
| `motion`         | `^12.38.0` | React 19-compatible, tree-shakable animations | `npm install motion@latest` |
| `@motionone/dom` | `^10.18.0` | Web Animations API polyfill (auto-included)   | (peer dependency)           |

### Data & Backend

| Package                 | Version    | Purpose                                | Installation                        |
| ----------------------- | ---------- | -------------------------------------- | ----------------------------------- |
| `@supabase/supabase-js` | `^2.101.0` | Supabase client (anon + service role)  | `npm install @supabase/supabase-js` |
| `@supabase/ssr`         | `^0.5.0`   | Supabase helpers for Next.js SSR       | `npm install @supabase/ssr`         |
| `cloudinary`            | `^2.5.0`   | Cloudinary Node SDK for signed uploads | `npm install cloudinary`            |
| `@cloudinary/url-gen`   | `^2.2.0`   | Programmatic image URL generation      | `npm install @cloudinary/url-gen`   |

### AI & Chat

| Package          | Version   | Purpose                                  | Installation                 |
| ---------------- | --------- | ---------------------------------------- | ---------------------------- |
| `ai`             | `^4.1.0`  | Vercel AI SDK core (streaming, RSC)      | `npm install ai`             |
| `@ai-sdk/google` | `^1.0.0`  | Google Generative AI provider (Gemini)   | `npm install @ai-sdk/google` |
| `zod`            | `^3.23.0` | Runtime validation for AI inputs/outputs | `npm install zod`            |

### Forms & Utilities

| Package                         | Version    | Purpose                                          | Installation                                |
| ------------------------------- | ---------- | ------------------------------------------------ | ------------------------------------------- |
| `react-hook-form`               | `^7.51.0`  | Performant form handling                         | `npm install react-hook-form`               |
| `@hookform/resolvers`           | `^3.9.0`   | Zod resolver for RHF                             | `npm install @hookform/resolvers`           |
| `resend`                        | `^3.5.0`   | Transactional email delivery                     | `npm install resend`                        |
| `@supabase/ssr`                 | `^0.5.0`   | Supabase helpers for Next.js SSR                 | `npm install @supabase/ssr`                 |
| `@supabase/auth-helpers-nextjs` | `^0.11.0`  | Auth middleware + session management for Next.js | `npm install @supabase/auth-helpers-nextjs` |
| `@supabase/auth-helpers-nextjs` | `^0.11.0`  | Auth middleware + session management for Next.js | `npm install @supabase/auth-helpers-nextjs` |
| `lucide-react`                  | `^0.378.0` | Consistent, accessible icon set                  | `npm install lucide-react`                  |

### Development & Quality

| Package                        | Version  | Purpose                           | Installation                                     |
| ------------------------------ | -------- | --------------------------------- | ------------------------------------------------ |
| `eslint`                       | Latest   | Linting with Next.js rules        | `npm install -D eslint @next/eslint-plugin-next` |
| `prettier`                     | `^3.3.0` | Code formatting                   | `npm install -D prettier`                        |
| `@types/node` + `@types/react` | Latest   | TypeScript definitions            | `npm install -D @types/node @types/react`        |
| `snyk`                         | Latest   | Dependency vulnerability scanning | `npm install -g snyk`                            |

---

## 🔐 "Gatekeeper" Security Implementation

All privileged operations (database writes, Cloudinary uploads) are performed exclusively inside Next.js Server Actions. The browser never sees service role keys or API secrets.

### Environment Variables Classification

```bash
# .env.local (NEVER commit to repo)

# 🔓 Public (safe for client)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# 🔐 Server-Only (CRITICAL: Never expose)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret-here
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-key

# 🌐 Deployment
VERCEL_PROJECT_ID=your-project-id
```

### Supabase Client Setup

#### Client Browser (Client-Side Reads Only)

```typescript
// lib/supabase.ts
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

#### Admin Client (Server-Side Only)

```typescript
// lib/supabase-admin.ts
"use server"; // ⚠️ Critical: Marks file as server-only
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 🔐 Bypasses RLS
);

// Helper: Type-safe query wrapper
export async function adminQuery<T>(
  queryFn: (db: ReturnType<typeof supabaseAdmin>) => Promise<T>,
): Promise<T> {
  return queryFn(supabaseAdmin);
}
```

### Supabase Auth Session Management

#### Server Session Helpers (`lib/auth.ts`)

```typescript
// lib/auth.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// Verify admin user in Server Actions
export async function verifyAdminSession() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");
  // Optional: Add role/permission checks via custom claims
  return session;
}
```

#### Login Server Action

```typescript
// app/actions/login.ts
"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(email: string, password: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  // 1️⃣ Sign in with Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // 2️⃣ Session automatically managed by Supabase (httpOnly cookie)
  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.signOut();
  redirect("/login");
}
```

#### Proxy Session Validation (`src/proxy.ts`)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  // Create Supabase server client with request cookies
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  // Security headers for all responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
```

### Cloudinary Signed Upload Flow

```typescript
// app/actions/upload.ts
"use server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdminJWT } from "@/lib/auth";

// Configure once at module load (server-only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // 🔐 Never leaves server
});

export async function uploadProjectPhoto(formData: FormData) {
  // 1️⃣ AuthZ: Verify admin session
  const session = await verifyAdminSession();
  if (!session) {
    throw new Error("Unauthorized: Admin access required");
  }

  // 2️⃣ Validate input
  const file = formData.get("file") as File;
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  // 3️⃣ Process & upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "tripax/projects" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  return {
    url: (result as any).secure_url,
    public_id: (result as any).public_id,
  };
}
```

### Critical Safety Rules

❌ Never import supabase-admin.ts or Cloudinary config in client components.  
❌ Never log environment variables.  
✅ Always verify session via `verifyAdminSession()` or Middleware at the start of any modifying Server Action.  
✅ Enable RLS on all tables and define policies using `auth.uid()`.  
✅ Disable unsigned upload presets in Cloudinary dashboard.  
✅ Never expose `SUPABASE_SERVICE_ROLE_KEY` or `CLOUDINARY_API_SECRET` to client.

---

## 🤖 AI Chatbot: Gemini 2.5 Flash Integration

### Why Gemini 2.5 Flash?

| Factor                        | Benefit for Tripax                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Cost Efficiency**           | ~60% cheaper than Gemini Pro; ideal for high-volume public chat                                                         |
| **Low Latency**               | <500ms response time; critical for mobile users on job sites                                                            |
| **Agentic Reasoning**         | Handles multi-step queries: _"Show 3BHK flats in Gulshan under 2 crore with possession in 2026"_                        |
| **Multilingual**              | Native Bengali understanding + English output flexibility                                                               |
| **128K Context Window**       | Can ingest full project catalogs, FAQs, land partnership terms for accurate RAG                                         |
| **Structured Output Support** | Can return JSON for lead qualification: `{ "intent": "land_partnership", "location": "Banani", "landSize": "5_katha" }` |

### Architecture Overview

```
Client (Chat UI)
       │
       ▼
/app/api/chat (Route Handler)
       │
       ▼
generateChatResponse (Server Action)
       │
       ├──► Vercel AI SDK + @ai-sdk/google
       │
       ├──► [Optional] RAG: Fetch context from Supabase
       │      • pgvector similarity search
       │      • Filter by user role (public vs admin)
       │
       ▼
streamText({ model: google('gemini-2.5-flash'), ... })
       │
       ▼
Streaming response to client via useChat hook
```

### Server Action: Chat Engine

```typescript
// app/actions/chat.ts
"use server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { z } from "zod";

// Input validation schema
const chatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    }),
  ),
  userContext: z
    .object({
      isAdmin: z.boolean().optional(),
      currentProjectSlug: z.string().optional(),
    })
    .optional(),
});

export async function generateChatResponse(rawInput: unknown) {
  // 1️⃣ Validate & sanitize input
  const { messages, userContext } = chatInputSchema.parse(rawInput);

  // 2️⃣ Enrich with RAG context (optional)
  let ragContext = "";
  if (userContext?.isAdmin) {
    // Fetch internal knowledge base
    const { data } = await supabaseAdmin
      .from("internal_knowledge")
      .select("content")
      .limit(5);
    ragContext = `\nInternal Context: ${data?.map((d) => d.content).join("\n")}`;
  } else {
    // Fetch public FAQ + project data
    const [{ data: faqs }, { data: projects }] = await Promise.all([
      supabaseAdmin.from("faqs").select("question, answer").limit(10),
      supabaseAdmin
        .from("projects")
        .select("title, description")
        .eq("status_enum", "completed")
        .limit(5),
    ]);
    ragContext = `\nPublic FAQ: ${faqs?.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n")}`;
  }

  // 3️⃣ Stream AI response
  const result = await streamText({
    model: google("gemini-2.5-flash"),
    messages,
    system: `You are a professional construction assistant for Tripax Homes Ltd. Always respond in English unless the user writes in Bengali. 
Never provide legal/financial advice. Focus on project details, site availability, and lead qualification.${ragContext}`,
    temperature: 0.3,
    maxTokens: 500,
  });

  return createStreamableValue(result.textStream).value;
}
```

### Client Component: Chat UI

```tsx
// components/Chatbot.tsx
"use client";
import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    onFinish: () => {
      setTimeout(
        () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    },
  });

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#FF7F3E] shadow-lg"
          aria-label="Open chat"
        >
          💬
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl flex flex-col max-h-96">
          <div className="bg-[#003285] text-white p-4 rounded-t-xl flex justify-between items-center">
            <h2 className="font-semibold">Tripax Assistant</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4 overflow-hidden" ref={scrollRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                    msg.role === "user"
                      ? "bg-[#FF7F3E] text-white"
                      : "bg-gray-100 text-[#003285]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about our projects..."
              className="flex-1"
            />
            <Button type="submit" className="bg-[#FF7F3E]">
              Send
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
```

---

## ⚡ Performance Optimization Strategy

### Core Web Vitals Targets

| Metric  | Target | Implementation                                                                    |
| ------- | ------ | --------------------------------------------------------------------------------- |
| **LCP** | < 1.5s | Next.js Image + Cloudinary `quality: auto`, critical CSS inlining, React Compiler |
| **INP** | < 50ms | `useAnimate` (~2kb), debounced handlers, worker-based form validation             |
| **CLS** | < 0.05 | Reserved image ratios, `next/font` with `display: swap`, font fallback metrics    |
| **FCP** | < 0.8s | SSR for above-fold content, edge caching, preconnect to CDN                       |

### Caching Strategy

| Resource                           | Strategy                     | TTL                | Implementation                                                         |
| ---------------------------------- | ---------------------------- | ------------------ | ---------------------------------------------------------------------- |
| Public Pages (`/`, `/about`)       | ISR                          | 1 hour             | `export const revalidate = 3600`                                       |
| Project Pages (`/projects/[slug]`) | ISR + Stale-While-Revalidate | 1 hour + 5 min SWR | `revalidate: 3600`, `stale-while-revalidate: 300`                      |
| API Responses                      | Edge Cache                   | 5 min              | Vercel `x-vercel-cache` headers                                        |
| Static Assets (JS/CSS)             | Immutable                    | 1 year             | Next.js default + `Cache-Control: public, max-age=31536000, immutable` |
| Chat API                           | No Cache                     | 0                  | `Cache-Control: no-store`                                              |

### Next.js Configuration (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ React 19 + Compiler
  experimental: {
    dynamicIO: true,
  },

  // ✅ Image optimization
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "images.unsplash.com" }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ✅ Output caching
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],

  // ✅ Environment validation
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};

export default nextConfig;
```

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### Tables Overview

```sql
-- Projects (RLS ENABLED, NO POLICIES = server-only access)
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- 🔐 NO RLS POLICIES = only accessible via supabaseAdmin (service key)

-- Project Images
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  cloudinary_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (captured via Server Actions)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  inquiry_type_enum TEXT CHECK (inquiry_type_enum IN ('flat_purchase', 'land_development', 'commercial', 'other')),
  message TEXT,
  status_enum TEXT DEFAULT 'new' CHECK (status_enum IN ('new', 'contacted', 'qualified', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Internal Knowledge Base (for AI RAG - admin only)
CREATE TABLE internal_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  relevance_score FLOAT DEFAULT 0.5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- 🔐 Add RLS policy later if needed: ONLY admins can read/write
```

### Indexing Strategy

```sql
-- Performance indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status_enum);
CREATE INDEX idx_projects_location ON projects(location);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status_enum);
CREATE INDEX idx_leads_phone ON leads(phone);

-- Full-text search for FAQ/knowledge
CREATE INDEX idx_faqs_search ON faqs USING gin(to_tsvector('english', question || ' ' || answer));
CREATE INDEX idx_knowledge_search ON internal_knowledge USING gin(to_tsvector('english', topic || ' ' || content));
```

---

## 🌐 Hosting & Infrastructure

| Service              | Purpose                                     | Configuration                                    |
| -------------------- | ------------------------------------------- | ------------------------------------------------ |
| **Vercel**           | Hosting, serverless functions, edge network | Production branch auto-deploys from main         |
| **Vercel KV**        | Rate limiting, session cache                | Used for API rate limits (chatbot, contact form) |
| **Custom Domain**    | tripaxhomes.com (or .com.bd)                | SSL/TLS automatically provided by Vercel         |

### Deployment Requirements

- **Build command:** `next build`
- **Output directory:** `.next`
- **Node.js version:** 20.x or newer
- **Environment variables:** All secrets set in Vercel dashboard (never committed)

---

## 📁 Cloudinary Folder Structure & Configuration

### Folder Organization

```
tripax/
├── projects/
│   ├── [project-slug]/
│   │   ├── hero/          # 1200x900, quality: auto
│   │   ├── gallery/       # 800x600, quality: good
│   │   └── floorplans/    # PNG, no compression
├── team/                  # 400x400, circle crop
├── certifications/        # SVG/PNG, no transform
├── marketing/
│   ├── banners/           # 1920x600, quality: auto
│   └── social/            # 1200x630 (OG), quality: good
└── temp/                  # Auto-cleaned via Cloudinary rule (7 days)
```

### Upload Preset Configuration (Dashboard)

```markdown
✅ DISABLE all unsigned upload presets
✅ Enable "Strict transform validation"
✅ Set folder restrictions: Only allow uploads to /tripax/*
✅ Enable "Delete on overwrite" for predictable public_id behavior
```

### Upload Method (Server-Signed Only)

- **Unsigned upload presets:** DISABLED in Cloudinary dashboard
- **API secret:** `CLOUDINARY_API_SECRET` (server-only env var)
- **Delivery optimization:** `f_auto, q_auto, c_fill, g_auto`

---

## 🚀 Development & Deployment Workflow

### Repository Structure (simplified)

```
tripax/
├── app/
│   ├── (public)/          # public routes (home, about, projects...)
│   ├── admin/             # protected CMS
│   ├── actions/           # server actions (upload, chat, lead creation)
│   ├── api/               # optional route handlers (webhooks)
│   └── layout.tsx
├── components/            # shadcn + custom components
├── lib/
│   ├── supabase-admin.ts  # server-only supabase client
│   ├── supabase-client.ts # anon client for public reads
│   ├── auth.ts            # Supabase session helpers
│   └── cloudinary.ts      # server config
├── public/                # static assets (favicon, robots.txt)
├── middleware.ts
├── next.config.ts
└── .env.local (never committed)
```

### Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "nodeVersion": "20.x",
  "git": {
    "deploymentEnabled": true,
    "autoAlias": false
  },
  "env": [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
    "SUPABASE_SERVICE_ROLE_KEY",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "GOOGLE_GENERATIVE_AI_API_KEY"
  ]
}
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm audit --audit-level=high

  deploy:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          production: true
```

### Pre-Launch Security Checklist

```bash
# 🔐 Run before production deploy

[ ] Verify SUPABASE_SERVICE_ROLE_KEY not in client bundle:
    next build && grep -r "service_role" .next/static/

[ ] Confirm Cloudinary has NO unsigned presets enabled

[ ] Test direct Supabase anon queries return ONLY intended public data

[ ] Validate JWT middleware redirects unauthenticated /admin access

[ ] Run npm audit && snyk test --severity-threshold=high

[ ] Enable Vercel Security Headers in dashboard:
    - Strict-Transport-Security: max-age=31536000; includeSubDomains
    - X-Content-Type-Options: nosniff
    - X-Frame-Options: DENY
    - Referrer-Policy: strict-origin-when-cross-origin

[ ] Penetration test: Attempt XSS, CSRF, IDOR on /admin endpoints

[ ] Rate limit chat API: Implement Vercel KV or Upstash Redis token bucket

[ ] Verify RLS is enabled on all Supabase tables

[ ] Test build passes TypeScript and linting

[ ] Production preview tested on mobile devices (iOS Safari, Android Chrome)
```

---


### Structured Logging Example

```typescript
// lib/logger.ts
export function logEvent(event: {
  type: "chat_message" | "lead_submit" | "admin_action" | "upload" | "error";
  timestamp: Date;
  userId?: string;
  metadata: Record<string, unknown>;
}) {
  // In production: send to Vercel Logs / Sentry
  if (event.type === "error") {
    console.error(`[ERROR] ${event.type}:`, event.metadata);
  } else {
    console.log(
      `[${event.type.toUpperCase()}] ${event.timestamp}:`,
      event.metadata,
    );
  }
}
```

---

## 🔮 Future Extensibility

### Planned Enhancements

**Multilingual (i18n):** Next.js built-in middleware + next-intl for Bangla/English  
**Booking / Site Visit Scheduler:** Add a calendar widget (Cal.com or custom) – still using Gatekeeper pattern  
**Lead Scoring:** Integrate with a CRM (HubSpot, Pipedrive) via webhooks  
**PWA:** Next.js next-pwa for offline access to project brochures  
**Mobile App:** React Native / Expo for iOS/Android with shared component library

---

## 📋 Development Phases (from Approved PRD)

| Phase                            | Duration | Key Deliverables                              |
| -------------------------------- | -------- | --------------------------------------------- |
| 1. Discovery & Architecture      | 1 wk     | Supabase schema, Gatekeeper design, JWT flow  |
| 2. UI Foundation                 | 2 wks    | shadcn setup, Tailwind, responsive layout     |
| 3. Core Pages & Content          | 3 wks    | Home, About, Services, Contact, FAQ, Legal    |
| 4. Projects Portfolio            | 2 wks    | Filters, case studies, Cloudinary integration |
| 5. Admin Panel & Gatekeeper      | 2.5 wks  | JWT auth, Server Actions, CRUD UI             |
| 6. AI Chatbot (Gemini)           | 1.5 wks  | Streaming chat, RAG, safety filters           |
| 7. Animations & View Transitions | 1 wk     | LazyMotion, useAnimate, route transitions     |
| 8. QA, Security Audit & Deploy   | 1.5 wks  | Penetration testing, staging → prod           |

---

> 🔐 **Final Security Reminder:** The Gatekeeper model places full trust in your Next.js server code. Every Server Action must:
>
> 1. Validate authentication (`verifyAdminJWT()`)
> 2. Sanitize inputs (Zod schemas)
> 3. Log privileged operations
> 4. Never leak secrets in errors
>
> _When in doubt: fail closed, not open._
