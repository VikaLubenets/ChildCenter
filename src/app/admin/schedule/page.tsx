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
import type {AppEvent} from '@/constants/DBTypes';
import EditEventModal from "./(modals)/EditEventModal";


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
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idToShow, setIdToShow] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState<EventCalendar>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: '0'
  });

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

  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: String(new Date().getTime()) });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: String(new Date().getTime()) };
    setAllEvents([...allEvents, event]);
  }

  function handleEditModal(data: { event: { id: string } }) {
    setShowEditModal(true);
    setIdToShow(data.event.id);
    setIdToDelete(data.event.id);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDeleteModal(false);
    setShowEditModal(false);
    setIdToShow(null);
  }

  function handleCloseDeleteModal() {
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
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            drop={(data) => addEvent(data)}
            eventClick={(data) => handleEditModal(data)}
          />
        </div>
        <div className="ml-8 w-full p-2 mt-16 lg:h-1/2">
          <button onClick={() => setShowModal(true)} className='btn w-max-[100%]'>Создать мероприятие</button>
        </div>
      </div>
      <CreateEventModal
        showModal={showModal}
        closeModal={handleCloseModal}
      />
      <EditEventModal 
        id={idToShow}
        showModal={showEditModal}
        closeModal={handleCloseModal} 
        showDeleteModal={showDeleteModal}
        handleDeleteModal={setShowDeleteModal} 
        />
       <DeleteEventModal
          eventId={idToDelete}
          showModal={showDeleteModal}
          closeModal={handleCloseDeleteModal}
        />
    </section>
  )
}

export default ScheduleComponent;