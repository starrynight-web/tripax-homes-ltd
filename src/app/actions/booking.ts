"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function createConsultation(formData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  type: "Private Consultation" | "Site Visit";
  project_name?: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("consultations")
    .insert([
      {
        ...formData,
        status: "Pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating consultation:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/consultations");
  return data;
}
