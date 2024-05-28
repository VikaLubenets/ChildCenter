export interface Service {
  title: string;
  description: string;
  srcImage: string;
  link: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ServicesResponse {
  services: Service[];
}

export interface ServiceUpdated {
  newTitle: string;
  newDescription: string;
  newSrcImage: string;
  id: string;
}

export interface Contact {
  title: string;
  description: string;
  _id?: string;
}

export interface ContactResponse {
  contacts: Contact[];
}

export interface ContactUpdated {
  newTitle: string;
  newDescription: string;
  id: string;
}