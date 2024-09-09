export interface CountryRequest {
  name: string;
  link: string;
  flag: string;
  circuit: string;
  petition: string; //нова властивість

}

export interface CountryResponse extends CountryRequest {
  value: any;
  id: number | string;
}
