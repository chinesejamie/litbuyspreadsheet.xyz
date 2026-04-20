"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

interface BrandData {
  _id?: string;
  name: string;
  logo: string;
  instagram: string;
}

const EMPTY: BrandData = { name: "", logo: "", instagram: "" };

export default function BrandForm({ brand }: { brand?: BrandData }) {
  const router = useRouter();
  const [form, setForm] = useState<BrandData>(brand || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!brand?._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { setError("Name is required"); return; }
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/brands/${brand!._id}` : "/api/admin/brands";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/admin/brands");
      else setError("Failed to save brand");
    } catch { setError("Connection error"); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Name *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Instagram URL</label>
          <input type="text" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            placeholder="https://instagram.com/..."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 outline-none focus:border-accent transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Logo</label>
          <ImageUpload images={form.logo ? [form.logo] : []} onChange={(imgs) => setForm({ ...form, logo: imgs[0] || "" })} multiple={false} />
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50">
            {saving ? "Saving..." : isEdit ? "Update Brand" : "Create Brand"}
          </button>
          <button type="button" onClick={() => router.push("/admin/brands")}
            className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
