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