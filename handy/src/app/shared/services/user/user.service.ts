import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { checkIfUserAlreadyExistWithMail, checkpasswordsURL, updatePasswordURL, userAlreadyExistWithUsername, userURL } from 'src/app/core/constants/constants';
import { UserMapper } from 'src/app/core/mappers/user-mapper';
import { User } from 'src/app/core/models/user';
import { AddressService } from '../address/address.service';
import { PhotoService } from '../photo/photo.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mapper: UserMapper;
  constructor(private http: HttpClient, private addressService: AddressService, private photoService: PhotoService) {
    this.mapper = new UserMapper();
  }

  checkPassword(encodePassword: string, newPassword: string): Observable<boolean>{
    let params = new HttpParams();
    params = params.set('encodePassword', encodePassword);
    params = params.set('newPassword', newPassword);

    return this.http
      .get<boolean>(checkpasswordsURL, { params: params });
  }

  userAlreadyExistWithUsername(username: string): Observable<boolean>{
    let params = new HttpParams();
    params = params.set('username', username);

    return this.http
      .get<boolean>(userAlreadyExistWithUsername, { params: params });
  }

  checkIfUserAlreadyExistWithMail(mail: string): Observable<boolean>{
    let params = new HttpParams();
    params = params.set('mail', mail);

    return this.http
      .get<boolean>(checkIfUserAlreadyExistWithMail, { params: params });
  }

  updatePassword(userID: number, oldPassword: string, newPassword: string, recoveringPasswordFlag: boolean): Observable<User> {

    let params = new HttpParams();
    params = params.set('userID', userID.toString());
    params = params.set('oldPassword', oldPassword);
    params = params.set('newPassword', newPassword);
    params = params.set('recoveringPasswordFlag', recoveringPasswordFlag);

    return this.http
      .post(
        updatePasswordURL,
        params
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToUser(response);
        })
      );

  }


  register(user: User, photos: File[]): Observable<User> {

    const formData = new FormData();
    formData.append('userDTO', new Blob([JSON.stringify(this.mapper.userToDto(user))], { type: 'application/json' }));

    if(photos.length === 0)
    formData.append(`photo`, new Blob([JSON.stringify(photos)]));

    for (let i = 0; i < photos.length; i++) {
      formData.append(`photo`, new Blob([JSON.stringify(photos)]));
    }

    return this.http
      .post(
        userURL,
        formData
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToUser(response);
        })
      );
  }

  getUserByID(userID: number): Observable<User> {
    return this.http
      .get(userURL + "/" + userID)
      .pipe(
          map((response) => {
            return this.mapper.dtoToUser(response);
          })
      );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get(userURL + "/getUserByUsername/" + username)
      .pipe(
          map((response) => {
            return this.mapper.dtoToUser(response);
          })
      );
  }

  emptyUser(): User {

    return {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      dateBorn : new Date(),
      username: '',
      password: '',
      tel: '',
      address: this.addressService.emptyAddress(),
      photo: [],
    }
  }
}
