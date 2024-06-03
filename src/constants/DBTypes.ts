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

export interface AppEvent  {
  _id?: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  everyWeek: boolean;
  address: string;
  price: string;
  imagesSrc: string[] | string;
  type: 'master-class' | 'lesson' | 'ecological';
}

export interface EventUpdated {
  id: string;
  newTitle: string;
  newDescription: string;
  newDate: string;
  newStartTime: string,
  newEndTime: string,
  newEveryWeek: boolean;
  newAddress: string;
  newPrice: string;
  newImagesSrc: string[] | string;
  newType: 'master-class' | 'lesson' | 'ecological';
}

export interface EventResponse {
  events: AppEvent[];
}

export interface About {
  description: string;
  type: 'rent' | 'studio';
  _id?: string;
}

export interface AboutResponse {
  about: About;
}

export interface AboutUpdate {
  newDescription: string;
  id: string;
}

export interface Certificate {
  title: string;
  price: string;
  _id?: string;
}

export interface CertificateResponse {
  certificates: Certificate[];
}

export interface CertificateUpdated {
  newTitle: string;
  newPrice: string;
  id: string;
}