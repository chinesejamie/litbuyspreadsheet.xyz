"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/products?limit=200`)
      .then((r) => r.json())
      .then((data) => {
        const found = data.products?.find((p: { _id: string }) => p._id === id);
        setProduct(found || null);
        setLoading(false);
      });
  }, [id]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : product ? (
        <ProductForm product={product} />
      ) : (
        <p className="text-red-400">Product not found</p>
      )}
    </AdminLayout>
  );
}
