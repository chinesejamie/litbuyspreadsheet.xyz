"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="text-gray-500 text-sm">Create a new product listing</p>
      </div>
      <ProductForm />
    </AdminLayout>
  );
}
