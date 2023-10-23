import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, takeUntil, throwError } from 'rxjs';
import { mailURL } from 'src/app/core/constants/constants';
import { UserMapper } from 'src/app/core/mappers/user-mapper';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  userMapper: UserMapper;

  constructor(    private http: HttpClient,) {
    this.userMapper = new UserMapper();
   }

  sendEmailAndGetCheckCode(user: User): Observable<any> {

    const formData = new FormData();
    formData.append('userDTO', new Blob([JSON.stringify(this.userMapper.userToDto(user))], { type: 'application/json' }));

    return this.http
      .post(
        mailURL + '/sendEmailRegisterCode',
        formData,
        { responseType: 'text' },
      )
      .pipe(
        map((response: string) => {
          // Transform your response if needed
          return response;
        }),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);  // Rethrow the error to be caught by subscribers
        })
      );
  }

  sendEmailToRecoverPassword(username: string): Observable<any> {

    return this.http
      .post(
        mailURL + '/recoverPassword',
        username,
      )
      .pipe(
        map((response: any) =>{
          return this.userMapper.dtoToUser(response);;
        }
        )
      );
  }
}
