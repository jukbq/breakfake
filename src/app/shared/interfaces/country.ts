    export interface CountryRequest {
      name: string;
      link: string;
      flag: string;
      circuit: string;
      
    }

    export interface CountryResponse extends CountryRequest {
      value: any;
      id: number | string;
    }
  