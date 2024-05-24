import { Service, ServiceUpdated, ServicesResponse } from "@/constants/DBTypes";
import { cache } from "react";

export const getServices = cache(async (): Promise<ServicesResponse | null> => {
  try{
    const res = await fetch('/api/services');

    if(!res.ok){
      throw new Error('Failed to fetch services')
    }

    const services: ServicesResponse = await res.json();
    return services;
  } catch(err){
    console.error(err);
    return null
  }
});

export const addService = cache(async (params: Service): Promise<Response | null> => {
  try{
    const res = await fetch('/api/services', {
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
    console.error("Error adding service:", err);
    return null;
  }
});

export const getServiceById = cache(async (id: string): Promise<{ service: Service } | null> => {
  try {
    const response = await fetch(`/api/services/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch service");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
})

export const updateService = cache(async (params: ServiceUpdated): Promise<{ service: Service } | null> => {
  try {
    const response = await fetch(`/api/services/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newTitle: params.newTitle, newDescription: params.newDescription }),
    });
    if (!response.ok) {
      throw new Error("Failed to update service");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
})

export const deleteService = cache(async (id: string): Promise<Response | null> => {
  try {
    const response = await fetch(`/api/services/?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete service");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting service:", error);
    return null;
  }
})