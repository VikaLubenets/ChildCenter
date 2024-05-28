'use client'

import { getServiceById, updateService } from "@/store/queries/services";
import { Service } from "@/constants/DBTypes";
import AdminForm from "@/components/AdminForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default function EditServices({ params }: Params) {
  const { id } = params;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchService = async () => {
      const serviceData = await getServiceById(id);
      if (serviceData) {
        setService(serviceData.service);
      }
      setLoading(false);
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  const { title, description, srcImage } = service;

  const fields = [
    { name: "title", type: "text", placeholder: "Название услуги", value: title },
    { name: "description", type: "text", placeholder: "Описание услуги", value: description },
    { name: "srcImage", type: "text", placeholder: "Ссылка на обложку", value: srcImage },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { title, description, srcImage } = formData;
    const res = await updateService({ id, newTitle: title, newDescription: description, newSrcImage: srcImage });
    if (res) {
      router.refresh();
      router.push("/admin");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}