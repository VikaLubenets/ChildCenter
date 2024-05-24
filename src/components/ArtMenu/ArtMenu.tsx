'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Service } from "@/constants/DBTypes";
import { getServices } from "@/store/queries/services";


export const ArtMenu = () => {
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
  
  return (
    <article className='flex flex-row gap-5 p-x-5 p-b-5'>
        {services.map((option) => (
          <Link key={option._id} href={option.link} className="group relative block w-1/5">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={option.srcImage}
                alt={option.title}
                width={300}
                height={200}
                className="object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h3 className="text-white text-lg font-semibold">{option.title}</h3>
              </div>
            </div>
          </Link>
        ))}
    </article>
  );
};
