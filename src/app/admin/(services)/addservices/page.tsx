'use client';

import { addService } from "@/store/queries/services";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddServices(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [srcImage, setSrcImage] = useState("");
  const [link, setLink] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!title || !description || !srcImage || !link) {
      alert("All fields are required.");
      return;
    }

    const res = await addService({title, description, srcImage, link})

    if (res) {
      router.push("/admin");
    } else {
      console.error("Failed to create a service");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center m-10">
      <input 
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type='text'
        placeholder='Название услуги'
      />
      <input 
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type='text'
        placeholder='Описание услуги'
      />
      <input 
        onChange={(e) => setSrcImage(e.target.value)}
        value={srcImage}
        className="border border-slate-500 px-8 py-2"
        type='text'
        placeholder='Ссылка на обложку'
      />
      <input 
        onChange={(e) => setLink(e.target.value)}
        value={link}
        className="border border-slate-500 px-8 py-2"
        type='text'
        placeholder='Ссылка на страницу'
      />
      <button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        className="bg-green-500 font-bold text-white px-5 py-3 w-fit cursor-pointer"
      >
        Сохранить
      </button>
    </form>
  )
}