"use client"

import AdminContainer from "@/components/AdminContainer";
import Loader from "@/components/Loader/Loader";
import { Service } from "@/constants/DBTypes";
import { deleteService, getServices } from "@/store/queries/services";
import { useEffect, useState } from "react";

export const ServicesLine = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const servicesData = await getServices();
      if (servicesData) {
        setServices(servicesData.services);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleRemove = (id: string) => {
    setServices((prevServices) => prevServices.filter(service => service._id !== id));
  };

  return (
    <AdminContainer
      header={"Виды услуг"}
      info={services}
      onRemove={handleRemove}
      deleteFunction={deleteService}
      basePath={"/admin/editservices"}
      addBtnName={"Добавить услугу"}
      addBtnPath={"/admin/addservices"}
    />
  );
}