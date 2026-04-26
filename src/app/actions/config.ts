"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getSiteConfig() {
  const { data, error } = await supabaseAdmin
    .from("site_config")
    .select("key, value");

  if (error) throw new Error(error.message);

  // Transform array of {key, value} into a single object
  const config = data.reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return config;
}

export async function saveSiteConfig(config: Record<string, string>) {
  const payload = Object.entries(config).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString()
  }));

  const { error } = await supabaseAdmin
    .from("site_config")
    .upsert(payload);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}
