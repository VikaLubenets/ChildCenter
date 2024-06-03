'use client'

import AdminContainer from "@/components/AdminContainer";
import Loader from "@/components/Loader/Loader";
import { About as AboutType } from "@/constants/DBTypes";
import { useEffect, useState } from "react";
import { getRentDescription, getStudioDescription, deleteAbout } from "@/store/queries/about";

export default function About() {
  const [about, setAbout] = useState<AboutType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const rent = await getRentDescription();
      const studio = await getStudioDescription();

      if (rent && studio) {
        setAbout([rent.about, studio.about]);
      } else if (rent) {
        setAbout([rent.about]);
      } else if (studio) {
        setAbout([studio.about]);
      }

      setLoading(false);
    };

    fetchAbout();
  }, []);

  const handleRemove = (id: string) => {
    setAbout(prev => prev.filter(item => item._id !== id));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AdminContainer
      header={"Описания мастерской и аренды"}
      info={about}
      onRemove={handleRemove}
      deleteFunction={deleteAbout}
      basePath={"/admin/editabout"}
      addBtnName={"Добавить описание"}
      addBtnPath={"/admin/addabout"}
    />
  );
}