import { Certificate, CertificateResponse, CertificateUpdated } from "@/constants/DBTypes";
import { cache } from "react";

export const getCertificates = cache(async (): Promise<CertificateResponse | null> => {
  try{
    const res = await fetch('/api/certificates');

    if(!res.ok){
      throw new Error('Failed to fetch certificates')
    }

    const certificates: CertificateResponse = await res.json();
    return certificates;
  } catch(err){
    console.error(err);
    return null
  }
});

export const addCertificate = async (params: Certificate): Promise<Response | null> => {
  try{
    const res = await fetch('/api/certificates', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: params.title, 
        price: params.price
      }),
    });
    
    return res;
  } catch(err){
    console.error("Error adding certificate:", err);
    return null;
  }
};

export const deleteCertificate = cache(async (id: string): Promise<Response | null> => {
  try {
    const response = await fetch(`/api/certificates/?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete certificate");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return null;
  }
})

export const getCertificateById = cache(async (id: string): Promise<{ certificate: Certificate } | null> => {
  try {
    const response = await fetch(`/api/certificates/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch certificate");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return null;
  }
})

export const updateCertificate = cache(async (params: CertificateUpdated): Promise<{ certificate: Certificate } | null> => {
  try {
    const response = await fetch(`/api/certificates/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
        newTitle: params.newTitle, 
        newPrice: params.newPrice,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update certificate");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return null;
  }
})