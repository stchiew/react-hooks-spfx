import { ICountry } from "./ICountry";

export interface IServices {
  getCountryItems(): Promise<ICountry[]>;

}

