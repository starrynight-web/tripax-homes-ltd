"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function chatWithAI(messages: { role: "user" | "model", content: string }[]) {
  try {
    // 1. Read knowledge base
    const skillPath = path.join(process.cwd(), "src/lib/ai/skill.md");
    const knowledge = fs.readFileSync(skillPath, "utf-8");

    // 2. Initialize Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are the Tripax Emerald Assistant. Use the following knowledge base to assist the user. If you don't know something, be honest and offer to connect them with a human consultant. 
      
      KNOWLEDGE BASE:
      ${knowledge}
      
      Always be professional, luxury-focused, and helpful.`
    });

    // 3. Format history for Gemini
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    return { 
      success: true, 
      content: response.text() 
    };
  } catch (error) {
    console.error("AI Error:", error);
    return { 
      success: false, 
      content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again or contact our hotline directly." 
    };
  }
}
