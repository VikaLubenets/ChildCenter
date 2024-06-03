'use client'

import AdminForm from "@/components/AdminForm";
import { About, AboutResponse } from "@/constants/DBTypes";
import { addOrUpdateRentDescription, addOrUpdateStudioDescription } from "@/store/queries/about";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddAbout() {
  const router = useRouter();

  const [descriptionType, setDescriptionType] = useState<'rent' | 'studio'>('rent');

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { description } = formData;
    if (!description) {
      alert("Description field cannot be empty.");
      return;
    }

    const params: About = { description, type: descriptionType };

    let addOrUpdateFunction;
    if (descriptionType === 'rent') {
      addOrUpdateFunction = addOrUpdateRentDescription;
    } else {
      addOrUpdateFunction = addOrUpdateStudioDescription;
    }

    const res = await addOrUpdateFunction(params);

    if (res) {
      router.push("/admin");
    } else {
      console.error("Failed to create or update description");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold mb-4">Create Description</h2>
      <select value={descriptionType} onChange={(e) => setDescriptionType(e.target.value as 'rent' | 'studio')} className="border border-gray-300 px-3 py-2 mb-4">
        <option value="rent">Rent</option>
        <option value="studio">Studio</option>
      </select>
      <AdminForm 
        fields={[
          { name: "description", type: "textarea", placeholder: "Описание", value: "" }
        ]} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}