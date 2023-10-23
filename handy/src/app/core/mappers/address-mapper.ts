import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Country } from '../models/country';
import { Province } from '../models/province';
import { Location } from '../models/location';

@Injectable({
    providedIn: 'root'
  })
  export class AddressMapper {

    //Aca transformo la estructura que recibo de Java, la transformo a un model (Se usa para los gets (Traer datos del back))
    //IMPORTANTE: Lo que esta a la izquierda de los :, son las variables del model (front), y lo que esta a la derecha, son las variables
    // DTO de java

    dtoToAddress(addressDTO: any): Address {

      return {
        // variable del front: variable del back
        id: addressDTO?.id ? addressDTO.id : 0,
        street: addressDTO?.street ? addressDTO.street : '',
        location: this.dtoToLocation(addressDTO?.locationDTO),
        postcode: addressDTO?.postcode ? addressDTO.postcode : 0,
        apartmentFlag: addressDTO?.apartmentFlag ? addressDTO.apartmentFlag : false,
        apartment: addressDTO?.apartment ? addressDTO.apartment : '',
      };
    }

    //Aca pasa al reves que arriba, transformo un model (front) a un objetoDTO para java
    // Se usa para los Post (Crear algo nuevo) y Put (Actualizar)

    addressToDto(address: Address): any {
      return {
        //Variable del back: Variable del front
        id: address.id,
        street: address.street,
        locationDTO: this.locationToDto(address?.location),
        postcode: address.postcode,
        apartmentFlag: address.apartmentFlag,
        apartment: address.apartment,
      }
    }

    countryToDto(country: Country): any{
      return {
        id: country?.id ? country.id : 1,
        name: country?.name ? country.name : 'Argentina',
      }
    }

    dtoToCountry(countryDTO: any): Country {
      return {
        id: countryDTO?.id ? countryDTO?.id : 1,
        name: countryDTO?.name ? countryDTO?.name : 'Argentina',
      }
    }

    provinceToDto(province: Province): any {
      return{
        id:province?.id ? province?.id : 0,
        name: province?.name ? province?.name : '',
        countryDTO: this.countryToDto(province?.country),
      }
    }

    dtoToProvince(provinceDTO: any): Province {
      return {
        id: provinceDTO?.id ? provinceDTO?.id : 0,
        name: provinceDTO?.name ? provinceDTO?.name : '',
        country:this.dtoToCountry(provinceDTO?.countryDTO)
      }
    }

    locationToDto(location: Location): any {
      return{
        id: location.id,
        name: location.name,
        provinceDTO: this.provinceToDto(location?.province),
      }
    }

    dtoToLocation(location: any): Location {
      return {
        id: location?.id ? location.id : 0,
        name: location?.name ? location.name : '',
        province: this.dtoToProvince(location?.provinceDTO),
      }
    }


}
