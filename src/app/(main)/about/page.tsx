'use client'

import CTA from "@/components/CTA";
import { getStudioDescription } from "@/store/queries/about";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { About } from '@/constants/DBTypes'
import Loader from "@/components/Loader/Loader";

const About = () => {
  const [aboutStudio, setAboutStudio] = useState<About>({
    description: '',
    type: 'rent',
    _id: ''
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchAbout = async () => {
      const aboutResponse = await getStudioDescription();
      if (aboutResponse) {
        setAboutStudio(aboutResponse);
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
      <h2 className="subtitle-header">О творческой мастерской</h2>
      {aboutStudio ? (
        <p>{aboutStudio.description}</p>
      ) : (
        <div>Описание отсутствует</div>
      )}
      <CTA />
    </article>
  )
};

export default About;