'use client'

import AdminContainer from "@/components/AdminContainer";
import Loader from "@/components/Loader/Loader";
import { Contact } from "@/constants/DBTypes";
import { deleteContact, getContacts } from "@/store/queries/contacts";
import { useEffect, useState } from "react";

export default function Contacts(){
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactData = await getContacts();
      if (contactData) {
        setContacts(contactData.contacts);
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleRemove = (id: string) => {
    setContacts((prevServices) => prevServices.filter(contact => contact._id !== id));
  };

  return(
    <AdminContainer
      header={"Контакты"}
      info={contacts}
      onRemove={handleRemove}
      deleteFunction={deleteContact}
      basePath={"/admin/editcontact"}
      addBtnName={"Добавить контакт"}
      addBtnPath={"/admin/addcontact"}
    />
  )
}