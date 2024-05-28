'use client';

import { addService } from "@/store/queries/services";
import AdminForm from "@/components/AdminForm";
import { useRouter } from "next/navigation";

export default function AddServices() {
  const router = useRouter();

  const fields = [
    { name: "title", type: "text", placeholder: "Название услуги", value: "" },
    { name: "description", type: "text", placeholder: "Описание услуги", value: "" },
    { name: "srcImage", type: "text", placeholder: "Ссылка на обложку", value: "" },
    { name: "link", type: "text", placeholder: "Ссылка на страницу", value: "" },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { title, description, srcImage, link } = formData;

    if (!title || !description || !srcImage || !link) {
      alert("All fields are required.");
      return;
    }

    const res = await addService({ title, description, srcImage, link });

    if (res) {
      router.push("/admin");
    } else {
      console.error("Failed to create a service");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}