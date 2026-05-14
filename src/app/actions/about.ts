"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getAboutSections() {
  const { data, error } = await supabaseAdmin
    .from("about_sections")
    .select("*");

  if (error) throw new Error(error.message);

  return data.reduce((acc: any, section) => {
    acc[section.section_name] = section.content;
    return acc;
  }, {});
}

export async function saveAboutSection(name: string, content: any) {
  const { error } = await supabaseAdmin
    .from("about_sections")
    .upsert({
      section_name: name,
      content,
      updated_at: new Date().toISOString()
    }, { onConflict: "section_name" });

  if (error) throw new Error(error.message);

  revalidatePath("/about");
}

export async function getTeamMembers() {
  const { data, error } = await supabaseAdmin
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function saveTeamMember(member: any) {
  const { data, error } = await supabaseAdmin
    .from("team_members")
    .upsert(member)
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  revalidatePath("/about");
  return data;
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabaseAdmin
    .from("team_members")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/about");
}
