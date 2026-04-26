"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getInquiries() {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateInquiryStatus(id: string, status: string) {
  const { error } = await supabaseAdmin
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
  const { error } = await supabaseAdmin
    .from("inquiries")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/inquiries");
}
