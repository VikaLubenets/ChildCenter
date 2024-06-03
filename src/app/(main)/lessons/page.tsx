'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppEvent } from "@/constants/DBTypes";
import { getLessons } from "@/store/queries/eventTypes";



export default function Lessons(){
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getLessons();
      if(eventsData){
        setEvents(eventsData.events);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <article className="article">
      <h2 className="subtitle-header">Занятия для детей:</h2>
      <section className='flex w-full flex-row gap-5 p-x-5 p-b-5'>
          {events.length > 0 ? (events.map((option) => (
            <Link key={option._id} href={`/events/${option._id}`} className="group relative block w-1/5">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={'/logo.jpg'}
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
          ))) : (
            <div>События не найдены</div>
          )
        }
      </section>
    </article>
  );
};