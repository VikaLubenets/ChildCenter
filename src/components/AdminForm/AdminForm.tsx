"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Field = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
};

type DynamicFormProps = {
  fields: Field[];
  onSubmit: (formData: { [key: string]: string }) => Promise<void>;
};

export default function AdminForm({ fields, onSubmit }: DynamicFormProps) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as { [key: string]: string })
  );

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
    router.refresh();
    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center m-10">
      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
          className="border border-slate-500 px-8 py-2"
          placeholder={field.placeholder}
        />
      ))}
      <button
        className="bg-green-500 font-bold text-white px-5 py-3 w-fit cursor-pointer"
        type="submit"
      >
        Сохранить изменения
      </button>
    </form>
  );
}