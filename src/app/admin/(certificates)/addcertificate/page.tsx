'use client'

import AdminForm from "@/components/AdminForm";
import { addCertificate } from "@/store/queries/certificates";
import { useRouter } from "next/navigation";

export default function AddCertificate(){
  const router = useRouter();

  const fields = [
    { name: "title", type: "text", placeholder: "Описание сертификата", value: "" },
    { name: "price", type: "text", placeholder: "Цена", value: "" },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { title, price } = formData;

    if (!title || !price) {
      alert("All fields are required.");
      return;
    }

    const res = await addCertificate({ title, price });

    if (res) {
      router.push("/admin");
    } else {
      console.error("Failed to create a certificate");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}