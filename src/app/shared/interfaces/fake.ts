import { CountryResponse } from "./country";

export interface FakeRequest {
  country: CountryResponse;
  title: string;
  nameOrganization: string;
  descriptionOrganization: string;
  imageOrganization: string;
  linkPetition: string;

}

export interface FakeResponse extends FakeRequest {
  id: number | string;
}
