import { EventResponse } from "@/constants/DBTypes";
import { cache } from "react";

export const getLessons = cache(async (): Promise<EventResponse | null> => {
  try {
    const res = await fetch('/api/events?type=lesson');

    if (!res.ok) {
      throw new Error('Failed to fetch lessons');
    }

    const lessons: EventResponse = await res.json();
    return lessons;
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const getMasterClasses = cache(async (): Promise<EventResponse | null> => {
  try {
    const res = await fetch('/api/events?type=master-class');

    if (!res.ok) {
      throw new Error('Failed to fetch master-classes');
    }

    const masterClasses: EventResponse = await res.json();
    return masterClasses;
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const getEcoClasses = cache(async (): Promise<EventResponse | null> => {
  try {
    const res = await fetch('/api/events?type=ecological');

    if (!res.ok) {
      throw new Error('Failed to fetch eco-classes');
    }

    const ecoClasses: EventResponse = await res.json();
    return ecoClasses;
  } catch (err) {
    console.error(err);
    return null;
  }
});