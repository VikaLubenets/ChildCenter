'use client';

import AdminForm from "@/components/AdminForm";
import { addContact } from "@/store/queries/contacts";
import { useRouter } from "next/navigation";

export default function AddContact() {
  const router = useRouter();

  const fields = [
    { name: "title", type: "text", placeholder: "Наименование контакта", value: "" },
    { name: "description", type: "text", placeholder: "Контактные данные", value: "" },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { title, description } = formData;

    if (!title || !description) {
      alert("All fields are required.");
      return;
    }

    const res = await addContact({ title, description });

    if (res) {
      router.push("/admin");
    } else {
      console.error("Failed to create a contact");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}