'use client'

import { getServiceById } from "@/store/queries/services";
import { Service } from "@/constants/DBTypes";
import EditForm from "../EditForm";
import { useState, useEffect } from "react";

interface Params {
  params: {
    id: string;
  };
}

export default function EditServices({ params }: Params) {
  const { id } = params;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

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

  const { title, description } = service;

  return (
    <div>
      <EditForm id={id} title={title} description={description} />
    </div>
  );
}