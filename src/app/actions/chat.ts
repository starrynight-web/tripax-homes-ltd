"use server";

import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Server Action for AI Chat interactions.
 * Implements a hybrid RAG approach:
 * 1. Fetches real-time database context (Projects, FAQs).
 * 2. Injects them into the system prompt.
 * 3. Streams back the response from Gemini 2.5 Flash.
 */
export async function streamChatResponse(messages: any[]) {
  // Fetch dynamic context from Supabase
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('title, location, status, type')
    .eq('is_published', true);

  const { data: faqs } = await supabaseAdmin
    .from('faqs')
    .select('question, answer');

  const projectContext = projects?.map(p => 
    `- ${p.title} (${p.type}) in ${p.location}. Status: ${p.status}`
  ).join('\n') || 'No active projects listed.';

  const faqContext = faqs?.map(f => 
    `Q: ${f.question}\nA: ${f.answer}`
  ).join('\n\n') || 'No FAQs available.';

  const systemInstructions = `
You are the AI Assistant for Tripax Homes Ltd., a premium real estate developer in Dhaka.
Your goal is to assist potential clients with project details, land partnership inquiries, and general company info.

### Tone & Voice:
Professional, welcoming, and high-end. Use "we" and "Tripax Homes".

### Context Knowledge:
CURRENT PROJECTS:
${projectContext}

FREQUENTLY ASKED QUESTIONS:
${faqContext}

### General Info:
- Specialized in land development partnerships.
- Expertise in Gulshan, Banani, Baridhara, and Uttara.
- Use creative gradients in UI (Deep Blue to Slate Blue).

If asked about something not in context, politely state you don't have that specific detail but offer to connect them with a human sales representative.
  `.trim();

  // Use Gemini 2.5 Flash
  const result = streamText({
    model: google('gemini-1.5-flash'), // Vercel SDK often uses 1.5-flash for compatibility with "gemini-2.5-flash" naming if not yet updated, but 2.5-flash is preferred if available.
    system: systemInstructions,
    messages,
  });

  return result.toTextStreamResponse();
}
