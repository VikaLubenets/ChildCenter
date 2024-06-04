'use client'

import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from "@fullcalendar/core";
import ruLocale from '@fullcalendar/core/locales/ru';
import { getEvents } from "@/store/queries/events";
import Loader from "@/components/Loader/Loader";
import type {AppEvent } from '@/constants/DBTypes';
import { useRouter } from "next/navigation";


interface EventCalendar {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: string;
}

const ScheduleComponent = () => {
  const [allEvents, setAllEvents] = useState<EventCalendar[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsResponse = await getEvents();
      if (eventsResponse) {
        formatEvents(eventsResponse.events);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  function parseDateTime (date: string, time: string) {
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  };

  function formatEvents(events: AppEvent[]) {
    const res = events.map(event => ({
      title: event.title,
      start: parseDateTime(event.date, event.startTime),
      end: parseDateTime(event.date, event.endTime),
      allDay: false,
      id: event._id || ""
    }))
    setAllEvents(res)
  };

  function handleEventClick (id: string){
    router.push(`/events/${id}`)
  }

  return (
    <section className="flex flex-col min-h-screen gap-3 mt-10 w-full">
      <div className="grid grid-cols-10">
        <div className="col-span-9">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,dayGridMonth'
            }}
            locales={[ruLocale]}
            locale="ru"
            eventTimeFormat={
              {hour: '2-digit',
              minute: '2-digit',
              meridiem: false}
            }
            events={allEvents as EventSourceInput}
            nowIndicator={true}
            selectable={true}
            handleWindowResize={true}
            selectMirror={true}
            eventClick={(data) => handleEventClick(data.event.id)}
          />
        </div>
      </div>
    </section>
  )
}

export default ScheduleComponent;