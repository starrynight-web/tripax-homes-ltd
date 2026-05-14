"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASS = process.env.ADMIN_PASS;

export async function login(formData: FormData) {
  const id = formData.get("id") as string;
  const pass = formData.get("pass") as string;

  if (!ADMIN_ID || !ADMIN_PASS) {
    return { error: "Admin credentials are not configured in environment variables." };
  }

  if (id === ADMIN_ID && pass === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    
    // Also set the demo cookie if needed for legacy compatibility
    cookieStore.set("demo_admin", "true", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  }

  return { error: "Invalid ID or Password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  cookieStore.delete("demo_admin");
  redirect("/admin/login");
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}
