'use client'

import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from "@fullcalendar/core";
import CreateEventModal from "./(modals)/CreateEventModal";
import DeleteEventModal from "./(modals)/DeleteEventModal";
import ruLocale from '@fullcalendar/core/locales/ru';
import { getEvents } from "@/store/queries/events";
import Loader from "@/components/Loader/Loader";
import type {Event} from '@/constants/DBTypes';


interface EventCalendar {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: string;
}

const ScheduleComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<EventCalendar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<EventCalendar>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: '0'
  });

  useEffect(() => {
    const draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          const title = eventEl.getAttribute("title");
          const id = eventEl.getAttribute("data");
          return { title, id };
        }
      });
    }

    const fetchEvents = async () => {
      const eventsResponse = await getEvents();
      if (eventsResponse) {
        setEvents(eventsResponse.events)
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
    console.log('date: ', date)
    console.log('time: ', time)
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  };

  function formatEvents(events: Event[]) {
    const res = events.map(event => ({
      title: event.title,
      start: parseDateTime(event.date, event.startTime),
      end: parseDateTime(event.date, event.endTime),
      allDay: false,
      id: event._id || ""
    }))
    setAllEvents(res)
  };

  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: String(new Date().getTime()) });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: String(new Date().getTime()) };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(data.event.id);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  return (
    <section className="flex flex-col min-h-screen gap-5 m-10">
      <div className="grid grid-cols-10">
        <div className="col-span-8">
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
            events={allEvents as EventSourceInput}
            nowIndicator={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            droppable={true}
            dateClick={handleDateClick}
            drop={(data) => addEvent(data)}
            eventClick={(data) => handleDeleteModal(data)}
          />
        </div>
        <div className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-100" id='draggable-el'>
          <h2 className="font-bold text-sm text-center">Регулярные мероприятия</h2>
          <button onClick={() => setShowModal(true)} className='btn w-max-[100%]'>Создать мероприятие</button>
          {events.map(event => (
            <div
              className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
              title={event.title}
              key={event._id}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
      <CreateEventModal
        showModal={showModal}
        closeModal={handleCloseModal}
      />
      <DeleteEventModal
        eventId={idToDelete}
        showModal={showDeleteModal}
        closeModal={handleCloseModal}
      />
    </section>
  )
}

export default ScheduleComponent;