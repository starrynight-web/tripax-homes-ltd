"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getConsultations() {
  const { data, error } = await supabaseAdmin
    .from("consultations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function submitConsultation(formData: any) {
  const { data, error } = await supabaseAdmin
    .from("consultations")
    .insert([formData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/consultations");
  return data;
}

export async function updateConsultationStatus(id: string, status: string) {
  const { error } = await supabaseAdmin
    .from("consultations")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/consultations");
}

export async function deleteConsultation(id: string) {
  const { error } = await supabaseAdmin
    .from("consultations")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/consultations");
}
