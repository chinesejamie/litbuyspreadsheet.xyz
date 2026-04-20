"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import BrandForm from "@/components/admin/BrandForm";

export default function EditBrandPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/brands?limit=100")
      .then((r) => r.json())
      .then((data) => {
        const found = data.brands?.find((b: { _id: string }) => b._id === id);
        setBrand(found || null);
        setLoading(false);
      });
  }, [id]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Brand</h1>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : brand ? (
        <BrandForm brand={brand} />
      ) : (
        <p className="text-red-400">Brand not found</p>
      )}
    </AdminLayout>
  );
}
