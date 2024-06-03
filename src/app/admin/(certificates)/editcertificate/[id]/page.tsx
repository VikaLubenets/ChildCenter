'use client'

import AdminForm from "@/components/AdminForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Certificate } from "@/constants/DBTypes";
import Loader from "@/components/Loader/Loader";
import { getCertificateById, updateCertificate } from "@/store/queries/certificates";

interface Params {
  params: {
    id: string;
  };
}

export default function EditCertificate({ params }: Params) {
  const { id } = params;

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCertificate = async () => {
      const certificateData = await getCertificateById(id);
      if (certificateData) {
        setCertificate(certificateData.certificate);
      }
      setLoading(false);
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!certificate) {
    return <div>Contact not found</div>;
  }

  const { title, price } = certificate;

  const fields = [
    { name: "title", type: "text", placeholder: "Описание сертификата", value: title },
    { name: "price", type: "text", placeholder: "Цена", value: price },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { title, price } = formData;
    const res = await updateCertificate({ id, newTitle: title, newPrice: price});
    if (res) {
      router.refresh();
      router.push("/admin");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}