"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import OutfitForm from "@/components/admin/OutfitForm";

export default function NewOutfitPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Outfit</h1>
        <p className="text-gray-500 text-sm">Create a new outfit</p>
      </div>
      <OutfitForm />
    </AdminLayout>
  );
}
