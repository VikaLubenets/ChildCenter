'use client'

import AdminForm from "@/components/AdminForm";
import { About } from "@/constants/DBTypes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAboutById, updateAbout } from "@/store/queries/about";
import Loader from "@/components/Loader/Loader";

interface Params {
  params: {
    id: string;
  };
}

export default function EditAbout({ params }: Params) {
  const { id } = params;

  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAbout = async () => {
      const aboutData = await getAboutById(id);
      if (aboutData) {
        setAbout(aboutData.about);
      }
      setLoading(false);
    };

    fetchAbout();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!about) {
    console.log(about)
    return <div>About not found</div>;
  }

  const { description } = about;
  const placeholder = about.type === 'rent' ? 'Описание правил аренды студии' : 'Описание студии в разделе о мастерской'
  
  const fields = [
    { name: "description", type: "textarea", placeholder: placeholder, value: description },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    const { description } = formData;
    const res = await updateAbout({ id, newDescription: description});
    if (res) {
      router.refresh();
      router.push("/admin");
    }
  };

  return <AdminForm fields={fields} onSubmit={handleSubmit} />
}