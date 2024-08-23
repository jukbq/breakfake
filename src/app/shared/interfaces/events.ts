import { CountryResponse } from "./country";

export interface EventRequest {
    country: CountryResponse;
    namen: string;
    description: string;
    imagen: string;


}

export interface EventResponse extends EventRequest {
    id: number | string;
}
