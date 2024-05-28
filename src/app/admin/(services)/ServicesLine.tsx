"use client"

import Loader from "@/components/Loader/Loader";
import { Service } from "@/constants/DBTypes";
import { getServices } from "@/store/queries/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditBtn from "./EditBtn";
import RemoveBtn from './RemoveBtn'

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
    <article className="flex flex-col gap-5">
      <h2 className="lg:text-xl text-lg font-bold py-4">Виды услуг</h2>
      <div className="flex gap-5">
        {services && services.map(service => (
          <div key={service.title} className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{service.title}</h3>
              <div className="flex gap-3 items-center">
                <RemoveBtn id={service._id ?? ''} onRemove={() => handleRemove(service._id ?? '')} />
                <EditBtn id={service._id ?? ''} />
              </div>
            </div>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <Link href={"/admin/addservices"} className="btn max-w-[300px]">
        Добавить услугу
      </Link>
    </article>
  );
}