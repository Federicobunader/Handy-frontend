import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { PaymentMethodMapper } from './payment-method-mapper';
import { AddressMapper } from './address-mapper';
import { UserMapper } from './user-mapper';
import { Purchase } from '../models/purchase';
import { TotalToPayPerAuthorMapper } from './total-to-pay-per-author-mapper';

@Injectable({
    providedIn: 'root'
  })
  export class PurchaseMapper {

    paymentMethodMapper = new PaymentMethodMapper();
    addressMapper = new AddressMapper();
    userMapper = new UserMapper();
    totalToPayPerAuthorMapper = new TotalToPayPerAuthorMapper();

    dtoToPurchase(purchase: any): Purchase {
      return {
        // variable del front: variable del back
        id: purchase?.id ? purchase.id : 0,
        paymentMethod: this.paymentMethodMapper.dtoToPaymentMethod(purchase?.paymentMethodDTO),
        deliveryPoint: this.addressMapper.dtoToAddress(purchase?.deliveryPointDTO),
        totalToPayPerAuthor: this.totalToPayPerAuthorMapper.dtoToTotalToPayPerAuthor(purchase?.totalToPayPerAuthorDTO),
        buyer: this.userMapper.dtoToUser(purchase?.buyerDTO),
        seller: this.userMapper.dtoToUser(purchase?.sellerDTO),
        creationDate: purchase?.creationDateDTO ? purchase.creationDateDTO : null,
      };
    }

    purchaseToDto(purchase: Purchase): any {
      return {
        // variable del front: variable del back
        id: purchase?.id ? purchase.id : 0,
        paymentMethodDTO: this.paymentMethodMapper.paymentMethodToDto(purchase.paymentMethod),
        deliveryPointDTO: this.addressMapper.addressToDto(purchase.deliveryPoint),
        totalToPayPerAuthorDTO: this.totalToPayPerAuthorMapper.totalToPayPerAuthorToDto(purchase.totalToPayPerAuthor),
        buyerDTO: this.userMapper.userToDto(purchase.buyer),
        sellerDTO: this.userMapper.userToDto(purchase.seller),
        creationDateDTO: purchase?.creationDate ? purchase.creationDate : null,
      };
    }
  }
