import { Injectable } from '@angular/core';
import { Purchase } from 'src/app/core/models/purchase';
import { TotalToPayPerAuthorService } from '../../cart/services/total-to-pay-per-author-service/totalToPayPerAuthor.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { PaymentMethodService } from 'src/app/shared/services/payment-method/payment-method.service';
import { HttpClient } from '@angular/common/http';
import { CartMapper } from 'src/app/core/mappers/cart-mapper';
import { purchaseURL } from 'src/app/core/constants/constants';
import { PurchaseMapper } from 'src/app/core/mappers/purchase-mapper';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private totalToPayPerAuthorService: TotalToPayPerAuthorService,
    private userService: UserService,
    private addressService: AddressService,
    private paymentMethodService: PaymentMethodService,
    private http: HttpClient,
    private mapper: PurchaseMapper,
  )
  {
    this.mapper = new PurchaseMapper();
  }

  create(purchase: Purchase): Observable<Purchase> {
    return this.http
      .post(
        purchaseURL,
        this.mapper.purchaseToDto(purchase)
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToPurchase(response);
        })
      );
  }

  getPurchaseByTotalToPayPerAuthorIDAndBuyerID(totalToPayPerAuthorID: number, buyerID: number): Observable<Purchase> {
    return this.http
      .get(purchaseURL + '/purchases/' + buyerID + '/' + totalToPayPerAuthorID)
      .pipe(
        map((response) => {
          return this.mapper.dtoToPurchase(response);
        })
      );
  }

  getPurchasesForBuyer(fromID: number): Observable<Purchase[]> {
    return this.http
      .get(purchaseURL + '/purchasesForBuyer/' + fromID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((purchase: any) => {
             return this.mapper.dtoToPurchase(purchase);
          });
        })
      );
  }

  getPurchasesForSeller(sellerID: number): Observable<Purchase[]> {
    return this.http
      .get(purchaseURL + '/purchasesForSeller/' + sellerID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((purchase: any) => {
             return this.mapper.dtoToPurchase(purchase);
          });
        })
      );
  }

  emptyPurchase(): Purchase{
    return {
      id: 0,
      totalToPayPerAuthor: this.totalToPayPerAuthorService.emptyTotalToPayPerAuthor(),
      paymentMethod: this.paymentMethodService.emptyPaymentMethod(),
      deliveryPoint: this.addressService.emptyAddress(),
      buyer: this.userService.emptyUser(),
      seller: this.userService.emptyUser(),
      creationDate: new Date(),
    }
  }
}
