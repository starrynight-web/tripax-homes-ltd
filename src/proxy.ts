import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const is_admin_route = request.nextUrl.pathname.startsWith("/admin");
  const is_login_page = request.nextUrl.pathname === "/admin/login";
  const isDemoAdmin = request.cookies.get("demo_admin")?.value === "true";

  // Check for admin session
  const adminSession = request.cookies.get("admin_session")?.value === "authenticated";

  if (is_admin_route && !is_login_page && !user && !isDemoAdmin && !adminSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirect to dashboard if logged in and trying to access login page
  if (is_login_page && (user || isDemoAdmin || adminSession)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};
