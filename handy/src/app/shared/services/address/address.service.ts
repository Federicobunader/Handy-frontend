import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { geoNamesURL, getLocationsURL, getProvincesURL } from 'src/app/core/constants/constants';
import { AddressMapper } from 'src/app/core/mappers/address-mapper';
import { Address } from 'src/app/core/models/address';
import { Location } from 'src/app/core/models/location';
import { Province } from 'src/app/core/models/province';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements OnInit{

  constructor(private http: HttpClient, private mapper: AddressMapper) { }
  ngOnInit(): void {
    this.address.next(this.emptyAddress());
  }

  private address: BehaviorSubject<Address> = new BehaviorSubject<Address>(this.emptyAddress());

  setAddress(addressToSet : Address){
    return this.address.next(addressToSet);
 }

  getAddress(): Observable <Address>{
    return this.address;
  }


  getProvinces(): Observable<Province[]> {
    return this.http
      .get(getProvincesURL)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((province: any) => {
            return this.mapper.dtoToProvince(province);
          });
        }),
      );
  }

  getLocations(provinceID: number | undefined): Observable<Location[]> {
    return this.http
      .get(getLocationsURL + "/" + provinceID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((location: any) => {
            return this.mapper.dtoToLocation(location);
          });
        }),
      );
  }

  getLocationsIDs(provinceID: number | undefined): Observable<any[]> {
    return this.http
      .get(geoNamesURL + "/locationsByID/" + provinceID)
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  emptyAddress(): Address {
    return {
      id: 0,
      street: '',
      location: {
        id: 0,
        name: '',
        province: {
          id: 0,
          name: '',
          country:{
            id: 0,
            name: ''
          }
        }
      },
      postcode: 0,
      apartmentFlag: false,
      apartment: '',
    }
  }
}
