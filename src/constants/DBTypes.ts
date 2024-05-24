export interface Service {
  title: string;
  description: string;
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
  id: string;
}