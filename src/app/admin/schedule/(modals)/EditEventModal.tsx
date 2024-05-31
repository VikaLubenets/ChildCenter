'use client'

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Event } from '@/constants/DBTypes';
import { getEventById, updateEvent } from '@/store/queries/events';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import DeleteEventModal from './DeleteEventModal';

interface EditEventModalProps {
  id: string | null;
  showModal: boolean;
  closeModal: () => void;
  showDeleteModal: boolean;
  handleDeleteModal: (arg: boolean) => void
}

const EditEventModal: React.FC<EditEventModalProps> = ({ id, showModal, closeModal, showDeleteModal, handleDeleteModal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    everyWeek: false,
    address: '',
    price: '',
    imagesSrc: '',
    type: 'master-class',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if(!id) return
      const eventData = await getEventById(id);
      if (eventData?.event) {
        setNewEvent(eventData.event);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent!,
      [name]: name === 'everyWeek' ? value === 'true' : value,
    }));
  };

  const updateEventFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    if(!id) return;
    const { title, description, date, startTime, endTime, everyWeek, address, price, imagesSrc, type } = newEvent;

    if (!title || !description || !address || !price || !type) {
      alert('Название, описание, адрес, цена и тип мероприятия - обязательные поля');
      return;
    }

    const res = await updateEvent({ 
      id, 
      newTitle: title, 
      newDescription: description, 
      newDate: date, 
      newStartTime: startTime, 
      newEndTime: endTime, 
      newEveryWeek: everyWeek, 
      newAddress: address, 
      newPrice: price, 
      newImagesSrc: imagesSrc, 
      newType: type 
    });
    if (res) {
      router.refresh();
      router.push("/admin");
    }
  };

  const fields = [
    { id: 1, name: 'title', type: 'text', placeholder: 'Название' },
    { id: 2, name: 'description', type: 'textarea', placeholder: 'Описание' },
    { id: 3, name: 'date', type: 'date', placeholder: 'Дата' },
    { id: 4, name: 'startTime', type: 'time', placeholder: 'Время начала' },
    { id: 5, name: 'endTime', type: 'time', placeholder: 'Время окончания' },
    { id: 6, name: 'everyWeek', type: 'select', options: [{ value: 'true', label: 'Каждую неделю' }, { value: 'false', label: 'Разовое' }] },
    { id: 7, name: 'address', type: 'text', placeholder: 'Адрес' },
    { id: 8, name: 'price', type: 'text', placeholder: 'Цена' },
    { id: 9, name: 'imagesSrc', type: 'text', placeholder: 'Ссылки на фото' },
    { id: 10, name: 'type', type: 'select', options: [{ value: 'master-class', label: 'Мастер-класс' }, { value: 'lesson', label: 'Урок' }, { value: 'ecological', label: 'Эко-творчество' }] },
  ];

  const icon = <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />;

  return (
    <>
      {loading && <Loader />}
      {!newEvent && null}
      {newEvent && id && (
        <>
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          handleChange={handleChange}
          handleSubmit={updateEventFn}
          handleDelete={handleDeleteModal}
          newEvent={newEvent}
          fields={fields}
          icon={icon}
          title="Редактировать мероприятие"
        />
      </>
      )}
    </>
  );
};

export default EditEventModal;