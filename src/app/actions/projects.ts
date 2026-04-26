"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function addProject(project: any) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  revalidatePath("/projects");
  revalidatePath("/");
  return data;
}

export async function updateProject(id: string, updates: any) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/");
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/projects");
  revalidatePath("/");
}

export async function toggleFeaturedProject(id: string, is_featured: boolean) {
  const { error } = await supabaseAdmin
    .from("projects")
    .update({ is_featured })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}
