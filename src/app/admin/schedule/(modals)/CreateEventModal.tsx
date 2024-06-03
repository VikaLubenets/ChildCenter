'use client'

import { addEvent } from '@/store/queries/events';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Modal from './Modal';
import type {AppEvent} from '@/constants/DBTypes'

type CreateEventModalProps = {
  showModal: boolean;
  closeModal: () => void;
}

const CreateEventModal = ({
  showModal,
  closeModal
}: CreateEventModalProps) => {
  const router = useRouter();
  const [newEvent, setNewEvent] = useState<AppEvent>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === 'everyWeek' ? value === 'true' : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    closeModal();
    const { title, description, date, startTime, endTime, everyWeek, address, price, imagesSrc, type } = newEvent;

    if (!title || !description || !address || !price || !type) {
      alert("Название, описание, адрес, цена и тип мероприятия - обязательные поля");
      return;
    }

    const res = await addEvent({ title, description, date,  startTime, endTime, everyWeek, address, price, imagesSrc, type });

    if (res) {
      router.refresh();
      router.push("/admin/schedule");
    } else {
      console.error("Failed to create an event");
    }
  }


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
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newEvent={newEvent}
        fields={fields}
        icon={icon}
        title='Добавить мероприятие'
      />
  );
};

export default CreateEventModal;
