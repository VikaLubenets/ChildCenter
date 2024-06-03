'use client'

import BookingBtn from "@/components/BookingBtn";
import CTA from "@/components/CTA";
import { AppEvent } from "@/constants/DBTypes";
import { getEventById } from "@/store/queries/events";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  }
}

const EventPage = ({ params }: Props) => {
  const router = useRouter();
  const [event, setEvent] = useState<AppEvent  | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(params.id);
        if (!eventData || !eventData.event) {
          router.push('/schedule');
        } else {
          setEvent(eventData.event);
        }
      } catch (error) {
        console.error('Failed to fetch event:', error);
        router.push('/schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return null;
  }

  const eventTypeLabel = () => {
    switch (event.type) {
      case 'master-class':
        return 'Мастер-класс';
      case 'lesson':
        return 'Занятие';
      case 'ecological':
        return 'Эко-творчество';
      default:
        return 'Мероприятие';
    }
  };

  return (
    <article className="article">
      <div className="flex justify-between w-[95%]">
        <h2 className="subtitle-header">{`${eventTypeLabel()}: ${event.title}`}</h2>
        <BookingBtn />
      </div>
      <p className="text-gray-700">{event.description}</p>
      <p><strong>Дата:</strong> {event.date}</p>
      <p><strong>Время:</strong> {event.startTime} - {event.endTime}</p>
      <p><strong>Каждую неделю:</strong> {event.everyWeek ? "Да" : "Нет"}</p>
      <p><strong>Адрес:</strong> {event.address}</p>
      <p><strong>Цена:</strong> {event.price}</p>
      <div className="mt-4">
        {Array.isArray(event.imagesSrc) && event.imagesSrc.length > 0 ? (
          event.imagesSrc.map((src: string, index: number) => (
            <Image key={index} src={src} alt={event.title} width={600} height={400} />
          ))
        ) : (
          <Image src={'/images/artOptions/logo.jpg'} alt={'logo'} width={600} height={400} />
        )}
      </div>
      <CTA />
    </article>
  );
};

export default EventPage;