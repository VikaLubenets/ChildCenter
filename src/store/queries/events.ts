import { Event, EventResponse, EventUpdated } from "@/constants/DBTypes";
import { cache } from "react";

export const getEvents = cache(async (): Promise<EventResponse | null> => {
  try {
    const res = await fetch('/api/events');

    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: EventResponse = await res.json();
    return events;
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const addEvent = async (params: Event): Promise<Response | null> => {
  try {
    const res = await fetch('/api/events', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: params.title,
        description: params.description,
        date: params.date,
        startTime: params.startTime,
        endTime: params.endTime,
        everyWeek: params.everyWeek,
        address: params.address,
        price: params.price,
        imagesSrc: params.imagesSrc,
        type: params.type
      }),
    });

    return res;
  } catch (err) {
    console.error("Error adding event:", err);
    return null;
  }
};

export const deleteEvent = cache(async (id: string): Promise<Response | null> => {
  try {
    const response = await fetch(`/api/events/?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting event:", error);
    return null;
  }
});

export const getEventById = cache(async (id: string): Promise<{ event: Event } | null> => {
  try {
    const response = await fetch(`/api/events/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
});

export const updateEvent = cache(async (params: EventUpdated): Promise<{ event: Event } | null> => {
  try {
    const response = await fetch(`/api/events/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: params.newTitle,
        description: params.newDescription,
        date: params.newDate,
        startTime: params.newStartTime,
        endTime: params.newEndTime,
        everyWeek: params.newEveryWeek,
        address: params.newAddress,
        price: params.newPrice,
        imagesSrc: params.newImagesSrc,
        type: params.newType
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
});