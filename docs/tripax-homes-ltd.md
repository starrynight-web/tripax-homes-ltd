# Tripax Homes Ltd. - Construction Company Landing Page

## Tech Stack Implementation

```text
Tech Stack Requirements:
1. Next.js (App Router): v16.2 or newer
2. React Compiler: stable:v19.2 or newer
3. tailwind CSS v4: v4.2 or newer
4. shadcn/ui: v4.1 or newer
5. motion: v12.38 or newer
6. supabase: v2.101 or newer
7. Cloudinary: latest SDK
8. Vercel: latest
9. Serverless backend
```

## Color Palette

```css
Primary Forest Green: #11261A [rgb(17, 38, 26)]
Signature Gold:      #F2CD13 [rgb(242, 205, 19)]
Soft Highlight:      #D9D059 [rgb(217, 208, 89)]
Minimalist White:    #FFFFFF [rgb(255, 255, 255)]
```

## Typography Recommendation

```css
Headings: "Montserrat" - Bold, geometric sans-serif with a professional architectural feel
Body: "Plus Jakarta Sans" - Contemporary, sophisticated for premium aesthetics
Alternative: "Geist" or "Inter" - Clean, professional secondary options
```

## Page Structure

### 1. HOME PAGE Elements

- Hero: Minimalist Edison-inspired layout with "Beyond Excellence" tagline
- Statistics: Clean, borderless counters for Years, Projects, and Clients
- Featured Projects: Premium horizontal snap-scroll carousel
- Lead Capture: "Private Consultation" 50/50 split layout form
- Footer: Full-width, minimalist dark aesthetic with trademark branding

### 2. ABOUT US Page

- Company story/founding year
- Mission & Vision statements
- Core values (Quality, Safety, Integrity, Innovation)
- Leadership/Management team profiles
- Company milestones/timeline
- Certifications & accreditations
- Membership in industry associations

### 3. PROJECTS/PORTFOLIO Page

- Filter options (By Status: Completed/Ongoing)
- Filter options (By Type: Residential/Commercial/Industrial)
- Filter options (By Location)
- Project cards with:
  - High-quality images
  - Project name
  - Location
  - Size (sq ft/sqm)
  - Completion status
  - Brief description
  - "Learn More" button
- Detailed project case studies

### 4. SERVICES Page

- Service categories with descriptions
- Sector specialization (Residential, Commercial, Industrial, Infrastructure)
- Construction capabilities
- Design & Architecture services
- Project Management
- Consultation services
- After-sales/Maintenance services

### 5. CONTACT Page

- Multiple contact methods (Phone, Email, WhatsApp)
- Physical address with Google Maps integration
- Contact form (Name, Email, Phone, Message, Project Type)(Option for both purchasing flats or creating new buildings)
- Department-specific contacts
- Office hours
- Social media links
- Inquiry tracking system

### 6. FAQ Page

- Common questions about land-sharing model
- Construction process timeline
- Payment and ownership structure
- Legal documentation requirements

### 7. Privacy Policy & Terms Page

- Data collection and usage policy
- Terms of service for website usage
- Legal disclaimers for property investments

### 8. ADMIN PANEL

- Content management system for all pages
- Media upload and management via Cloudinary
- Project portfolio management
- Team member profile management
- Service offering updates
- Contact form inquiry tracking

## Security Architecture - "Gatekeeper" Pattern

To achieve a "zero-configuration" security model in Supabase and Cloudinary while maintaining a protected admin panel, you must shift all security logic to Next.js Server Actions or API Routes.

In this setup, your Next.js server acts as the "Gatekeeper." It is the only entity that holds the powerful "Master Keys" (Service Role Keys) to your database and media storage.

### 1. The "Gatekeeper" Architecture

- **Next.js (Server-Side):** This is where you store your Supabase Service Role Key and Cloudinary API Secret as environment variables. These are never exposed to the browser.
- **JWT Authentication:** Handled via Next.js 16 Proxy (`src/proxy.ts`) to protect `/admin` routes.
- **Bypassing Provider Security:**
  - **Supabase:** By using the service_role key in your server-side Supabase client, you automatically bypass all Row Level Security (RLS). You don't need to write a single SQL policy.
  - **Cloudinary:** By performing Signed Uploads from your server (using your API Secret), you bypass the need for "Upload Presets" or other security settings in the Cloudinary dashboard.

### 2. Implementation Strategy

#### A. Secure the Database (Supabase)

Initialize your Supabase client only on the server (e.g., in a Server Action) using the SUPABASE_SERVICE_ROLE_KEY.

```typescript
// lib/supabase-admin.ts
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // This key bypasses all RLS
)
```

#### B. Secure the Media (Cloudinary)

Instead of uploading directly from the browser, send the image to a Next.js Server Action. The server then signs the request and sends it to Cloudinary.

```typescript
// app/actions/upload.ts
"use server"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Kept strictly on server
})

export async function uploadProjectPhoto(formData: FormData) {
  // 1. Verify your Admin JWT here first!
  const file = formData.get('file') as File
  // 2. Perform signed upload
  const res = await cloudinary.uploader.upload(file.path)
  return res.secure_url
}
```

#### C. The Admin Protection Layer (JWT)

- Use Next.js 16 Proxy to intercept any request to `/admin/*`. If the JWT is missing or invalid, redirect the user immediately to `/login`.
- **Login:** Admin enters credentials -> Server verifies -> Server issues a session cookie.
- **Proxy:** Checks for that cookie on every admin page load.

### ⚠️ Critical Safety Warning

Because you are disabling security on the providers, your Next.js code is now the only line of defense.

- Never use the SUPABASE_SERVICE_ROLE_KEY in any file that doesn't have "use server" at the top.
- **Disable the Public Data API:** In your Supabase Settings, ensure RLS is Enabled on all tables, but simply do not create any policies. This effectively locks the front door for everyone except your server using the service key.

## AI Chatbot Implementation (Gemini 2.5 Flash)

To use Gemini 2.5 Flash (released June 2025) as a chatbot in your Next.js 16 app, use the Vercel AI SDK. This is the standard for building streaming AI interfaces.

### 1. Get Your API Key

- Go to Google AI Studio
- Click "Get API key" in the sidebar
- Create a new key and add it to your `.env.local` file:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### 2. Install Dependencies

```bash
npm install ai @ai-sdk/google
```

### 3. Create a Server Action (The Chat Engine)

Use a Server Action to handle the AI logic. This keeps your API key safe on the server.

```typescript
// app/actions/chat.ts
'use server';

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export async function generateChatResponse(messages: any[]) {
  // Use the 2.5 Flash model for high-speed, cost-effective chat
  const result = await streamText({
    model: google('gemini-2.5-flash'),
    messages,
    system: "You are a professional construction assistant for Tripax Homes Ltd., a Bangladeshi builder specializing in land-sharing agreements where we build on customer's land and resell allocated flats.",
  });

  return createStreamableValue(result.textStream).value;
}
```

### 4. Build the Chat UI

Use the useChat hook from the AI SDK. This handles message history and streaming automatically.

```tsx
// components/Chatbot.tsx
'use client';

import { useChat } from 'ai/react';

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="fixed bottom-4 right-4 w-80 p-4 bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <p className="p-2 inline-block rounded bg-gray-100 text-sm mb-2">{m.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 border rounded"
          value={input}
          placeholder="Ask about our services..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
```

### Why Gemini 2.5 Flash?

- **Cost Efficiency:** It is cheaper than the "Pro" models, ideal for a public-facing chatbot.
- **Speed:** It features lower latency.
- **Intelligence:** It is optimized for "agentic" tasks.

## Motion/React Implementation Guidelines

- **Import from motion/react** instead of framer-motion for tree-shakable, React 19-compatible version
- **Use the "Mini" Animation Hook (useAnimate):** Instead of wrapping every element in a `<motion.div>`, use the `useAnimate` hook. It is only ~2kb and lets you trigger complex animations via the browser's native Web Animations API, which is significantly faster for mobile users on job sites.
- **Lazy Loading:** Always wrap your animations in the `<LazyMotion>` component. This prevents the animation engine from loading until the user actually scrolls to an animated section, keeping your initial page load "A+" rated for SEO.
- **Native View Transitions:** For page-to-page transitions (e.g., clicking from "Home" to a "Project Details" page), use the Next.js 16 View Transitions API. It uses zero extra JavaScript and is handled entirely by the browser.

## Final Checklist for the Project

- [ ] Clear value proposition on homepage
- [ ] Professional, high-quality images
- [ ] Mobile-responsive design
- [ ] Fast loading speed
- [ ] Easy navigation menu
- [ ] Multiple contact options
- [ ] Project portfolio with filters
- [ ] About us with team photos
- [ ] Service descriptions
- [ ] Call-to-action on every page
- [ ] SEO-optimized content
- [ ] Social media integration
- [ ] Google Maps location
- [ ] Privacy policy & terms
- [ ] SSL certificate (HTTPS)

## Company Information

**Tripax Homes Ltd.**
Road-99, House-13/b, Gulshan-2, Dhaka, Bangladesh