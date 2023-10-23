import { IIdentifiable } from "./IIdentifiable";
import { Location } from "./location";

export interface Address extends IIdentifiable{
  street: string,
  location: Location,
  postcode: number,
  apartmentFlag: boolean,
  apartment: string,
}
