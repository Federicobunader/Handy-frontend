import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { TotalToPayPerCart } from '../models/total-to-pay-per-cart';
import { UserMapper } from './user-mapper';
import { TotalToPayPerAuthorMapper } from './total-to-pay-per-author-mapper';
import { CartMapper } from './cart-mapper';

@Injectable({
    providedIn: 'root'
  })
  export class TotalToPayPerCartMapper {

    userMapper = new UserMapper();
    totalToPayPerAuthor = new TotalToPayPerAuthorMapper();
    cartMapper = new CartMapper();

    dtoToTotalToPayPerCart(totalToPayPerCart: any): TotalToPayPerCart {
      return {
        // variable del front: variable del back
        id: totalToPayPerCart?.id ? totalToPayPerCart.id : 0,
        cart: this.cartMapper.dtoToCart(totalToPayPerCart.cartDTO),
        itemCartTotalToPay: totalToPayPerCart?.itemCartTotalToPay ? totalToPayPerCart.itemCartTotalToPay : 0,
        totalToPayPerAuthor: this.totalToPayPerAuthor.dtoToTotalToPayPerAuthor(totalToPayPerCart.totalToPayPerAuthorDTO),
        from: this.userMapper.dtoToUser(totalToPayPerCart.fromDTO),
      };
    }

    totalToPayPerCartToDto(totalToPayPerCart: TotalToPayPerCart): any {
      return {
        // variable del front: variable del back
        id: totalToPayPerCart?.id ? totalToPayPerCart.id : 0,
        cartDTO: this.cartMapper.cartToDto(totalToPayPerCart.cart),
        itemCartTotalToPay: totalToPayPerCart?.itemCartTotalToPay ? totalToPayPerCart.itemCartTotalToPay : 0,
        totalToPayPerAuthorDTO: this.totalToPayPerAuthor.totalToPayPerAuthorToDto(totalToPayPerCart.totalToPayPerAuthor),
        fromDTO: this.userMapper.userToDto(totalToPayPerCart.from),
      };
    }
  }
