import { IIdentifiable } from "./IIdentifiable";
import { Province } from "./province";

export interface Location extends IIdentifiable{
    name: string;
    province: Province;
  }