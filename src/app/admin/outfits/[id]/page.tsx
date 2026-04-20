"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import OutfitForm from "@/components/admin/OutfitForm";

export default function EditOutfitPage() {
  const { id } = useParams();
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/outfits?limit=100")
      .then((r) => r.json())
      .then((data) => {
        const found = data.outfits?.find((o: { _id: string }) => o._id === id);
        setOutfit(found || null);
        setLoading(false);
      });
  }, [id]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Outfit</h1>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : outfit ? (
        <OutfitForm outfit={outfit} />
      ) : (
        <p className="text-red-400">Outfit not found</p>
      )}
    </AdminLayout>
  );
}
