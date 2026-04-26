"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

/**
 * Fetch all published news articles
 */
export async function getPublishedArticles() {
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  // Map database fields to application expected fields if they differ
  return data.map(article => ({
    ...article,
    cover_image: article.thumbnail, // Map thumbnail to cover_image
    body: article.content, // Map content to body
  }));
}

/**
 * Fetch a single article by its slug
 */
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }

  // Map database fields to application expected fields
  return {
    ...data,
    cover_image: data.thumbnail,
    body: data.content,
  };
}

/**
 * Legacy support for getNewsArticles
 */
export async function getNewsArticles() {
  return getPublishedArticles();
}

export async function createNewsArticle(article: any) {
  const { data, error } = await supabaseAdmin
    .from("news")
    .insert([article])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return data;
}

export async function updateNewsArticle(id: string, article: any) {
  const { data, error } = await supabaseAdmin
    .from("news")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return data;
}

export async function deleteNewsArticle(id: string) {
  const { error } = await supabaseAdmin.from("news").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}
