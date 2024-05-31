import BookingBtn from "@/components/BookingBtn";
import CTA from "@/components/CTA";
import { getEventById } from "@/store/queries/events";
import { redirect } from "next/navigation";
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  }
}

const Event = async ({params}: Props) => {
  const eventData = await getEventById(params.id);

  const [event] = await Promise.all([
    eventData
  ])

  if(!event){
    console.log(eventData)
    redirect('/schedule')
  }

  const eventTypeLabel = () => {
    switch (event.event.type) {
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

  return(
    <article className="article">
      <div className="flex justify-between w-[95%]">
        <h2 className="subtitle-header">{`${eventTypeLabel()}: ${event.event.title}`}</h2>
        <BookingBtn />
      </div>
      <p className="text-gray-700">{event.event.description}</p>
      <p><strong>Дата:</strong> {event.event.date}</p>
      <p><strong>Время:</strong> {event.event.startTime} - {event.event.endTime}</p>
      <p><strong>Каждую неделю:</strong> {event.event.everyWeek ? "Да" : "Нет"}</p>
      <p><strong>Адрес:</strong> {event.event.address}</p>
      <p><strong>Цена:</strong> {event.event.price}</p>
      <div className="mt-4">
        {Array.isArray(event.event.imagesSrc) && event.event.imagesSrc.length > 0 ? (
          event.event.imagesSrc.map((src, index) => (
            <Image key={index} src={src} alt={event.event.title} width={600} height={400} />
          ))
        ) : (
          <Image src={'/logo.jpg'} alt={'logo'} width={600} height={400} />
        )}
      </div>
      <CTA />
    </article>
  )
};

export default Event;