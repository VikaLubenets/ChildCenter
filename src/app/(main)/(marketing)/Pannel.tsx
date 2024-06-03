'use client'

import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Service } from "@/constants/DBTypes";
import { getServices } from "@/store/queries/services";
import Loader from "@/components/Loader/Loader";

export const Pannel = () => {
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
    return <Loader />;
  }

  return (
    <section className="flex px-5" style={{ backgroundColor: "rgb(var(--foreground-rgb-marketing-pannel))" }}>
      {services && services.map((service, index) => (
        <>
          <div key={service._id} className="flex flex-col pt-4 gap-[30px] text-white">
            <h2 className="lg:text-xl text:lg">{service.title}</h2>
            <p>{service.description}</p>
            <Link href={service.link} className="cursor-pointer w-full flex gap-5 items-center text-black">
              Узнать больше
              <Image 
              src='/icons/arrow.svg' 
              alt='arrow icon' 
              width={14}
              height={15}
              className='w-4 h-4 object-contain'
              />
            </Link>
          </div>
          {index === 2 && <Image key={index} src={"/images/marketing/lesson.jpg"} alt={""} width={222} height={208} className='mr-4'/>}
        </>
        ))
      }
    </section>
  )
}