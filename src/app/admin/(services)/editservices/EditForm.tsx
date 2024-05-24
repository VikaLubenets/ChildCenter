"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateService } from "@/store/queries/services";

export default function EditForm({ id, title, description, srcImage }: {id: string, title: string, description: string, srcImage: string}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newSrcImage, setNewSrcImage] = useState(srcImage);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await updateService({id, newTitle, newDescription, newSrcImage}) 
    if(res){
      router.refresh();
      router.push("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center m-10">
      <input 
        className="border border-slate-500 px-8 py-2"
        type='text'
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        placeholder="Название услуги"
      />
      <input 
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type='text'
        placeholder="Описание услуги"
      />
      <input 
        onChange={(e) => setNewSrcImage(e.target.value)}
        value={newSrcImage}
        className="border border-slate-500 px-8 py-2"
        type='text'
        placeholder="Ссылка на обложку"
      />
      <button
        className="bg-green-500 font-bold text-white px-5 py-3 w-fit cursor-pointer"
        type='submit'
      >
        Сохранить изменения
      </button>
    </form>
  )
}