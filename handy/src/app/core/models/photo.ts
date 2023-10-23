import { IIdentifiable } from "./IIdentifiable";

export interface Photo extends IIdentifiable{
  url: string,
  name: string,
}
