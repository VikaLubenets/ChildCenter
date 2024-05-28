'use client'

import AdminForm from "@/components/AdminForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/constants/DBTypes";
import { getContactById, updateContact } from "@/store/queries/contacts";
import Loader from "@/components/Loader/Loader";

interface Params {
  params: {
    id: string;
  };
}

export default function EditContact({ params }: Params) {
  const { id } = params;

  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchService = async () => {
      const contactData = await getContactById(id);
      if (contactData) {
        setContact(contactData.contact);
      }
      setLoading(false);
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { title, description } = contact;

  const fields = [
    { name: "title", type: "text", placeholder: "Наименование контакта", value: title },
    { name: "description", type: "text", placeholder: "Контактные данные", value: description },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { title, description } = formData;
    const res = await updateContact({ id, newTitle: title, newDescription: description});
    if (res) {
      router.refresh();
      router.push("/admin");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}