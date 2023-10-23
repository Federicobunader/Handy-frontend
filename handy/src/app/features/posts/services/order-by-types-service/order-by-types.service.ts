import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { orderByTypeURL } from 'src/app/core/constants/constants';
import { OrderByTypeMapper } from 'src/app/core/mappers/order-by-type-mapper';
import { OrderByType } from 'src/app/core/models/orderByType';

@Injectable({
  providedIn: 'root'
})
export class OrderByTypesService {

  constructor(
    private http: HttpClient,
    private mapper: OrderByTypeMapper,
    ) { }

  getOrderByTypes(): Observable<OrderByType[]> {
    return this.http
      .get(orderByTypeURL)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((orderByType: any) => {
            return this.mapper.dtoToOrderByType(orderByType);
          });
        }),
      );
  }

  emptyOrderByType(): OrderByType {
    return {
      id: 0,
      name : '',
    };
  }
}
