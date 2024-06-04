"use client";

import { HiOutlineTrash } from "react-icons/hi";
import React from "react";

type RemoveBtnProps = {
  id: string;
  onRemove: () => void;
  deleteFunction: (id: string) => Promise<Response | null>;
};

const RemoveBtn = ({ id, onRemove, deleteFunction }: RemoveBtnProps) => {
  const handleRemove = async () => {
    const confirmed = confirm("Вы уверены, что хотите удалить эту информацию? Действие нельзя будет отменить");

    if (confirmed) {
      const res = await deleteFunction(id);
      if (res) {
        onRemove();
      } else {
        console.error('Error with deleting entity');
      }
    }
  };

  return (
    <button onClick={handleRemove} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;