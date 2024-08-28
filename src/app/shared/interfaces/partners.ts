import { CountryResponse } from "./country";

export interface PartnersRequest {
  name: string;
  link: string;
  description: string;
  image: string;
}

export interface PartnersResponse extends PartnersRequest {
  id: number | string;
}
