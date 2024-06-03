'use client'

import CTAConnect from "@/components/CTAConnect";
import Loader from "@/components/Loader/Loader";
import { About } from "@/constants/DBTypes";
import { getRentDescription } from "@/store/queries/about";
import { useEffect, useState } from "react";


const Rent = () => {
  const [aboutRent, setAboutRent] = useState<About>({
    description: '',
    type: 'rent',
    _id: ''
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAbout = async () => {
      const aboutResponse = await getRentDescription();
      if (aboutResponse) {
        setAboutRent(aboutResponse);
      }
      setLoading(false);
    };

    fetchAbout();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return(
    <article className="article">
      <h2 className="subtitle-header">Аренда студии</h2>
      {aboutRent ? (
        <p>{aboutRent.description}</p>
      ) : (
        <div>Описание отсутствует</div>
      )}
      <CTAConnect call='Напишите нам, чтобы арендовать студию' title='Связаться' />
    </article>
  )
};

export default Rent;