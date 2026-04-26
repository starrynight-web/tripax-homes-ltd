"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { projectsMock } from "@/data/projectsMock";

export async function runProjectsMigration() {
  let migratedCount = 0;
  let errors = [];

  // 1. Iterate through mock projects and insert using Admin bypass
  for (const project of projectsMock) {
    const { error } = await supabaseAdmin.from("projects").upsert({
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      location: project.location,
      region: project.region,
      category: project.category,
      type: project.type,
      overview: project.overview,
      progress_percent: project.progressPercent,
      thumbnail: project.thumbnail,
      homepage_thumbnail: project.homepageThumbnail,
      gallery: project.gallery,
      specs: project.specs,
      brochure_url: project.brochure_url || null,
      is_featured: true, 
      video_url: null
    }, { onConflict: 'slug' });

    if (error) {
      console.error(`Failed to migrate ${project.title}:`, error);
      errors.push({ title: project.title, error: error.message });
    } else {
      migratedCount++;
    }
  }

  if (errors.length > 0) {
    return { success: false, migrated: migratedCount, errors };
  }

  return { success: true, migrated: migratedCount };
}
