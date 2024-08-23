import { CountryResponse } from "./country";

export interface FakeRequest {
  country: CountryResponse;
  nameOrganization: string;
  descriptionOrganization: string;
  imageOrganization: string;
  linkPetition: string;

}

export interface FakeResponse extends FakeRequest {
  id: number | string;
}
