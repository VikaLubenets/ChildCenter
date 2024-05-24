"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { deleteService } from '../../../store/queries/services';
import React from "react";

export default function RemoveBtn({ id, onRemove }: { id: string, onRemove: () => void }) {

  const removeService = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await deleteService(id);
      if (res) {
        onRemove();
      } else {
        console.error('Error with deleting service');
      }
    }
  };

  return (
    <button onClick={removeService} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}