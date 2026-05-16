"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function trackWhatsAppClick() {
  try {
    // 1. Try to increment via RPC first (most efficient)
    const { error: rpcError } = await supabaseAdmin.rpc('increment_analytics_counter', { 
      counter_key: 'whatsapp_clicks' 
    });

    // 2. If RPC fails (e.g. not created yet), try direct increment or initialization
    if (rpcError) {
      console.log("RPC failed, trying direct upsert...");
      
      const { data: current, error: fetchError } = await supabaseAdmin
        .from("site_analytics")
        .select("value")
        .eq("key", "whatsapp_clicks")
        .maybeSingle();

      const newValue = (current?.value || 0) + 1;

      const { error: upsertError } = await supabaseAdmin
        .from("site_analytics")
        .upsert({ 
          key: "whatsapp_clicks", 
          value: newValue, 
          updated_at: new Date().toISOString() 
        }, { onConflict: 'key' });

      if (upsertError) {
        console.error("Tracking update failed:", upsertError);
        return { success: false, error: upsertError.message };
      }
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    console.error("Tracking process crashed:", err);
    return { success: false, error: err.message };
  }
}

export async function getWhatsAppClickCount() {
  const { data, error } = await supabaseAdmin
    .from("site_analytics")
    .select("value")
    .eq("key", "whatsapp_clicks")
    .maybeSingle();

  if (error) return 0;
  return data?.value || 0;
}
