import { CountryResponse } from "./country";

export interface EventRequest {
    country: CountryResponse;
    namen: string;
    link: string;
    description: string;
    imagen: string;
    createdAt: string;
}

export interface EventResponse extends EventRequest {
    id: number | string;
}
