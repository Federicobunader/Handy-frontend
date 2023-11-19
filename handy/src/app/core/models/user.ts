import { IIdentifiable } from "./IIdentifiable";
import { Address } from "./address";
import { Photo } from "./photo";

export interface User extends IIdentifiable{
    firstName: string;
    lastName: string;
    email: string;
    dateBorn: Date;
    username: string;
    password: string;
    tel: string;
    address: Address;
    photo: Photo[];
  }
