import { Contact, ContactResponse, ContactUpdated } from "@/constants/DBTypes";
import { cache } from "react";

export const getContacts = cache(async (): Promise<ContactResponse | null> => {
  try{
    const res = await fetch('/api/contacts');

    if(!res.ok){
      throw new Error('Failed to fetch contacts')
    }

    const contacts: ContactResponse = await res.json();
    return contacts;
  } catch(err){
    console.error(err);
    return null
  }
});

export const addContact = async (params: Contact): Promise<Response | null> => {
  try{
    const res = await fetch('/api/contacts', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: params.title, 
        description: params.description
      }),
    });
    
    return res;
  } catch(err){
    console.error("Error adding contact:", err);
    return null;
  }
};

export const deleteContact = cache(async (id: string): Promise<Response | null> => {
  try {
    const response = await fetch(`/api/contacts/?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    return null;
  }
})

export const getContactById = cache(async (id: string): Promise<{ contact: Contact } | null> => {
  try {
    const response = await fetch(`/api/contacts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch contact");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
})

export const updateContact = cache(async (params: ContactUpdated): Promise<{ contact: Contact } | null> => {
  try {
    const response = await fetch(`/api/contacts/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
        newTitle: params.newTitle, 
        newDescription: params.newDescription,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update contact");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
})