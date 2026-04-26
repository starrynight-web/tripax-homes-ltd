"use client";

import React, { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { getCloudinarySignature } from "@/app/actions/upload";
import Image from "next/image";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  resourceType?: "image" | "video" | "raw" | "auto";
  label?: string;
  accept?: string;
  value?: string;
  onRemove?: () => void;
}

export function CloudinaryUpload({ 
  onUpload, 
  resourceType = "auto", 
  label = "Upload File", 
  accept,
  value,
  onRemove
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Get signature from our secure backend
      const { signature, timestamp, apiKey, cloudName } = await getCloudinarySignature({
        folder: "tripax-homes"
      });

      // 2. Upload directly to Cloudinary from browser
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey!);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "tripax-homes");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload to Cloudinary");
      }

      const data = await res.json();
      onUpload(data.secure_url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError("Failed to upload file");
    } finally {
      setUploading(false);
      // reset file input
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
      
      {value ? (
        <div className="relative group rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center p-2 pr-10">
          {value.match(/\.(jpeg|jpg|gif|png|webp)$/i) || value.includes('image/upload') ? (
            <div className="relative w-16 h-12 rounded bg-slate-200 overflow-hidden mr-3 shrink-0">
               <Image src={value} alt="Uploaded" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center mr-3 shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase">FILE</span>
            </div>
          )}
          <a href={value} target="_blank" rel="noreferrer" className="text-xs text-primary font-medium truncate flex-1 hover:underline">
            {value.split('/').pop()}
          </a>
          
          {onRemove && (
            <button 
              type="button" 
              onClick={onRemove}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className={`w-full border-2 border-dashed rounded-xl px-4 py-6 flex flex-col items-center justify-center transition-colors ${uploading ? 'border-primary bg-primary/5' : 'border-slate-200 bg-slate-50 hover:border-primary/50'}`}>
            {uploading ? (
              <Loader2 className="animate-spin text-primary mb-2" size={24} />
            ) : (
              <UploadCloud className="text-slate-400 mb-2" size={24} />
            )}
            <p className="font-jakarta text-sm text-slate-600 font-medium">
              {uploading ? "Uploading securely..." : "Click or drag file to upload"}
            </p>
          </div>
        </div>
      )}
      
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
