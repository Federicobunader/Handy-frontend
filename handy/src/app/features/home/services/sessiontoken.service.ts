import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userURL } from 'src/app/core/constants/constants';
import { Observable, map } from 'rxjs';
import { UserMapper } from 'src/app/core/mappers/user-mapper';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessiontokenService {

  mapper: UserMapper;

  constructor(private http: HttpClient) {
    this.mapper = new UserMapper();
   }

  getUser(sessionToken: string): Observable<User> {

    return this.http
    .get(userURL + "/currentsession/" + sessionToken)
    .pipe(
      map((response) => {
        return this.mapper.dtoToUser(response);
      })
    );
  }

}
