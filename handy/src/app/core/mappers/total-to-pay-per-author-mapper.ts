import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { TotalToPayPerCart } from '../models/total-to-pay-per-cart';
import { UserMapper } from './user-mapper';
import { TotalToPayPerAuthor } from '../models/total-to-pay-per-author';

@Injectable({
    providedIn: 'root'
  })
  export class TotalToPayPerAuthorMapper {

    userMapper = new UserMapper();

    dtoToTotalToPayPerAuthor(totalToPayPerAuthor: any): TotalToPayPerAuthor {
      return {
        // variable del front: variable del back
        id: totalToPayPerAuthor?.id ? totalToPayPerAuthor.id : 0,
        author: this.userMapper.dtoToUser(totalToPayPerAuthor?.authorDTO),
        from: this.userMapper.dtoToUser(totalToPayPerAuthor?.fromDTO),
        totalToPay: totalToPayPerAuthor?.totalToPay ? totalToPayPerAuthor.totalToPay : 0,
        purchasedFlag: totalToPayPerAuthor?.purchasedFlag ? totalToPayPerAuthor.purchasedFlag : false,
        returnedFlag: totalToPayPerAuthor?.returnedFlag ? totalToPayPerAuthor.returnedFlag : false,
      };
    }

    totalToPayPerAuthorToDto(totalToPayPerAuthor: TotalToPayPerAuthor): any {
      return {
        // variable del front: variable del back
        id: totalToPayPerAuthor?.id ? totalToPayPerAuthor.id : 0,
        authorDTO: this.userMapper.userToDto(totalToPayPerAuthor.author),
        fromDTO: this.userMapper.userToDto(totalToPayPerAuthor.from),
        totalToPay: totalToPayPerAuthor?.totalToPay ? totalToPayPerAuthor.totalToPay : 0,
        purchasedFlag: totalToPayPerAuthor?.purchasedFlag ? totalToPayPerAuthor.purchasedFlag : false,
        returnedFlag: totalToPayPerAuthor?.returnedFlag ? totalToPayPerAuthor.returnedFlag : false,
      };
    }
  }
