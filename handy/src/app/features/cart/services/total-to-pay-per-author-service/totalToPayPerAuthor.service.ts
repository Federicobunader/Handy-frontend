import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { totalToPayPerAuthorURL } from 'src/app/core/constants/constants';
import { TotalToPayPerAuthorMapper } from 'src/app/core/mappers/total-to-pay-per-author-mapper';
import { TotalToPayPerAuthor } from 'src/app/core/models/total-to-pay-per-author';
import { UserMapper } from 'src/app/core/mappers/user-mapper';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Purchase } from 'src/app/core/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class TotalToPayPerAuthorService {

  constructor(
    private http: HttpClient,
    private totalToPayPerAuthorMapper: TotalToPayPerAuthorMapper,
    private userService: UserService,
  )
  {
    this.totalToPayPerAuthorMapper = new TotalToPayPerAuthorMapper();
  }

  create(totalToPayPerAuthor: TotalToPayPerAuthor): Observable<TotalToPayPerAuthor> {
    return this.http
      .post(
        totalToPayPerAuthorURL,
        this.totalToPayPerAuthorMapper.totalToPayPerAuthorToDto(totalToPayPerAuthor)
      )
      .pipe(
        map((response) => {
          return this.totalToPayPerAuthorMapper.dtoToTotalToPayPerAuthor(response);
        })
      );
  }

  getTotalToPay(userID: number): Observable<any> {
    return this.http
      .get(totalToPayPerAuthorURL + '/totalToPay/' + userID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((totalToPay: TotalToPayPerAuthor []) => {
             return this.totalToPayPerAuthorMapper.dtoToTotalToPayPerAuthor(totalToPay);
          });
        })
      );
  }

  getTotalToPayByAuthorID(totalToPayPerAuthorID: number): Observable<any> {
    return this.http
      .get(totalToPayPerAuthorURL + '/totalToPayByAuthorID/' + totalToPayPerAuthorID)
      .pipe(
        map((response) => {
          return this.totalToPayPerAuthorMapper.dtoToTotalToPayPerAuthor(response);
        })
      );
  }

  emptyTotalToPayPerAuthor(): TotalToPayPerAuthor{
    return {
      id: 0,
      author: this.userService.emptyUser(),
      from: this.userService.emptyUser(),
      totalToPay: 0,
      purchasedFlag: false,
    }
  }

}
