"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
}

export default function ImageUpload({
  images,
  onChange,
  multiple = true,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newImages = [...images];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const { url } = await res.json();
          newImages.push(url);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    onChange(multiple ? newImages : [newImages[newImages.length - 1]]);
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-24 h-24 rounded-lg overflow-hidden bg-white/5 border border-white/10 group"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 cursor-pointer transition-colors w-fit">
        <Upload size={16} />
        {uploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
}
