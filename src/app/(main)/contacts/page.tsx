'use client'

import CTA from "@/components/CTA";
import Loader from "@/components/Loader/Loader";
import SocialMedia from "@/components/SocialMedia";
import { Contact } from "@/constants/DBTypes";
import { getContacts } from "@/store/queries/contacts";
import { useEffect, useState } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await getContacts();
      if(contactsData){
        setContacts(contactsData.contacts);
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return(
    <article className="article">
      <h2 className="subtitle-header">Контакты</h2>
      {contacts && contacts.map(contact => {
        return(
        <div key={contact._id} className="flex flex-col p-3 border border-black rounded-md w-[90%]">
          <h2>{contact.title}</h2>
          <p>{contact.description}</p>
        </div>
        )
      })}
      <h2 className="subtitle-header">Мы в социальных сетях</h2>
      <SocialMedia row={true} className='w-[90%]'/>
    </article>
  )
};

export default Contacts;
