import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AddressMapper } from './address-mapper';
import { PhotoMapper } from './photo-mapper';
import { Photo } from '../models/photo';
import { PaymentMethodMapper } from './payment-method-mapper';

@Injectable({
    providedIn: 'root'
  })
  export class UserMapper {
    addressMapper = new AddressMapper();
    photoMapper = new PhotoMapper();
    paymentMethodMapper = new PaymentMethodMapper();
    //Aca transformo la estructura que recibo de Java, la transformo a un model (Se usa para los gets (Traer datos del back))
    //IMPORTANTE: Lo que esta a la izquierda de los :, son las variables del model (front), y lo que esta a la derecha, son las variables
    // DTO de java

    dtoToUser(user: any): User {
      return {
        // variable del front: variable del back
        id: user?.id ? user.id : 0,
        firstName: user?.firstName ? user.firstName : '',
        lastName: user?.lastName ? user.lastName : '',
        email: user?.email ? user.email : '',
        dateBorn: user?.dateBorn ? user.dateBorn: '',
        username: user?.username ? user.username : '',
        password:user?.password ? user.password : '',
        tel: user?.tel ? user.tel : 0,
        address: this.addressMapper.dtoToAddress(user?.addressDTO),
        photo: user?.photoDTO
          ? user.photoDTO.map((photoDTO: any) => {
            return this.photoMapper.dtoToPhoto(photoDTO)
          })
          : [],
      };
    }

    //Aca pasa al reves que arriba, transformo un model (front) a un objetoDTO para java
    // Se usa para los Post (Crear algo nuevo) y Put (Actualizar)

    userToDto(user: User): any {
      return {
        //Variable del back: Variable del front
        id: user?.id ? user.id : 0,
        firstName: user?.firstName ? user.firstName : '',
        lastName: user?.lastName ? user.lastName : '',
        email: user?.email ? user.email : '',
        dateBorn: user?.dateBorn ? user.dateBorn: '',
        username: user?.username ? user.username : '',
        password:user?.password ? user.password : '',
        tel: user?.tel ? user.tel : 0,
        addressDTO: this.addressMapper.addressToDto(user?.address),
        photoDTO: user?.photo
          ? user.photo.map((photo: Photo) => {
            return this.photoMapper.photoToDto(photo)
          })
          : [],
    }
}
}
