import { About, AboutResponse, AboutUpdate } from "@/constants/DBTypes";
import { cache } from "react";

export const getRentDescription = cache(async (): Promise<AboutResponse | null> => {
  try {
    const res = await fetch('/api/about/rent');

    if (!res.ok) {
      throw new Error('Failed to fetch rent description');
    }

    const rentDescription: AboutResponse = await res.json();
    return rentDescription;
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const getStudioDescription = cache(async (): Promise<AboutResponse | null> => {
  try {
    const res = await fetch('/api/about/studio');

    if (!res.ok) {
      throw new Error('Failed to fetch studio description');
    }

    const studioDescription: AboutResponse = await res.json();
    return studioDescription;
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const addOrUpdateRentDescription = async (params: About): Promise<Response | null> => {
  try {
    const res = await fetch('/api/about/rent', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params),
    });

    return res;
  } catch (err) {
    console.error("Error adding or updating rent description:", err);
    return null;
  }
};

export const addOrUpdateStudioDescription = async (params: About): Promise<Response | null> => {
  try {
    const res = await fetch('/api/about/studio', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params),
    });

    return res;
  } catch (err) {
    console.error("Error adding or updating studio description:", err);
    return null;
  }
};

export const deleteAbout = cache(async (id: string): Promise<Response | null> => {
  try {
    const response = await fetch(`/api/about/?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete about");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting about:", error);
    return null;
  }
})

export const getAboutById = async (id: string): Promise<{ about: About } | null> => {
  try {
    const response = await fetch(`/api/about/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch contact");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
}

export const updateAbout = async (params: AboutUpdate): Promise<{ about: About } | null> => {
  try {
    const response = await fetch(`/api/about/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
        newDescription: params.newDescription,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update about");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching about:", error);
    return null;
  }
}