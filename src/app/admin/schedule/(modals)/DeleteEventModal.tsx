'use client';

import { deleteEvent } from '@/store/queries/events';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { useRouter } from 'next/navigation';
import React from 'react';
import Modal from './Modal';

type DeleteEventModalProps = {
  eventId: string | null;
  showModal: boolean;
  closeModal: () => void;
}

const DeleteEventModal = ({
  eventId,
  showModal,
  closeModal
}: DeleteEventModalProps) => {
  const router = useRouter();

  const handleDelete = async (eventId: string | null) => {
    try {
      closeModal();
      if(!eventId) return;
      const res = await deleteEvent(eventId);
      if (res) {
        router.push("/admin/schedule");
      } else {
        console.error("Failed to delete the event");
      }
    } catch (error) {
      console.error("An error occurred while deleting the event:", error);
    }
  }

  return (
    <Modal 
      showModal={showModal}
      closeModal={closeModal}
      handleSubmit={handleDelete}
      icon={<TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />}
      title="Удаление события"
      content="Вы уверены, что хотите удалить это событие? Это действие не может быть отменено."
    />
  );
}

export default DeleteEventModal;