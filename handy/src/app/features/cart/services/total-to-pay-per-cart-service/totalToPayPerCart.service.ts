import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { totalToPayPerCarttURL } from 'src/app/core/constants/constants';
import { TotalToPayPerCart } from 'src/app/core/models/total-to-pay-per-cart';
import { TotalToPayPerCartMapper } from 'src/app/core/mappers/total-to-pay-per-cart-mapper';
import { ListOfTotalToPayPerCartGroupByAuthorMapper } from 'src/app/core/mappers/list-of-total-to-pay-per-cart-group-by-author-mapper';
import { ListOfTotalToPayPerCartGroupByAuthor } from 'src/app/core/models/listOfTotalToPayPerCartGroupByAuthor';

@Injectable({
  providedIn: 'root'
})
export class TotalToPayPerCartService {

  constructor(
    private http: HttpClient,
    private totalToPayPerCartMapper: TotalToPayPerCartMapper,
    private listOfTotalToPayPerCartGroupByAuthorMapper: ListOfTotalToPayPerCartGroupByAuthorMapper,
  )
  {
    this.totalToPayPerCartMapper = new TotalToPayPerCartMapper();
  }

  getTotalsToPayPerCart(totalToPayPerAuthorID: number): Observable<any> {
    return this.http
      .get(totalToPayPerCarttURL + '/totalToPayPerCarts/' + totalToPayPerAuthorID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((totalToPayPerCart: TotalToPayPerCart []) => {
             return this.totalToPayPerCartMapper.dtoToTotalToPayPerCart(totalToPayPerCart);
          });
        })
      );
  }

  getTotalsToPayPerCartForTotalToPayPerAuthorIDList(totalToPayPerAuthorID: number[]): Observable<any> {
    return this.http
      .get(totalToPayPerCarttURL + '/totalToPayPerCartsForCartDashboard/' + totalToPayPerAuthorID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((listOfTotalToPayPerCartGroupByAuthor: ListOfTotalToPayPerCartGroupByAuthor []) => {
             return this.listOfTotalToPayPerCartGroupByAuthorMapper.dtoToListOfTotalToPayPerCartGroupByAuthorMapper(listOfTotalToPayPerCartGroupByAuthor);
          });
        })
      );
  }

}
