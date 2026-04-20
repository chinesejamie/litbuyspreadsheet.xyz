"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import BrandForm from "@/components/admin/BrandForm";

export default function NewBrandPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Brand</h1>
        <p className="text-gray-500 text-sm">Add a new partner brand</p>
      </div>
      <BrandForm />
    </AdminLayout>
  );
}
