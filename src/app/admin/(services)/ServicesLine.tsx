"use client"

import { Service } from "@/constants/DBTypes";
import { getServices } from "@/store/queries/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import RemoveBtn from './RemoveBtn'

export const ServicesLine = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const servicesData = await getServices();
      if(servicesData){
        setServices(servicesData.services);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemove = (id: string) => {
    setServices((prevServices) => prevServices.filter(service => service._id !== id));
  };

  return (
    <article className="flex gap-5">
      {services && services.map(service => (
          <div key={service.title} className="flex flex-col gap-3 items-center">
            <RemoveBtn id={service._id ?? ''} onRemove={() => handleRemove(service._id ?? '')}/>
            <h3 className="font-bold">{service.title}</h3>
            <p>{service.description}</p>
            <Link href={`/admin/editservices/${service._id}`} className='cursor-pointer'>
              Изменить
            </Link>
          </div>
        ))
      }
    </article>
  )
}