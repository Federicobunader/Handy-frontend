import { Injectable } from '@angular/core';
import { TotalToPayPerCart } from '../models/total-to-pay-per-cart';
import { TotalToPayPerAuthorMapper } from './total-to-pay-per-author-mapper';
import { TotalToPayPerCartMapper } from './total-to-pay-per-cart-mapper';
import { ListOfTotalToPayPerCartGroupByAuthor } from '../models/listOfTotalToPayPerCartGroupByAuthor';

@Injectable({
    providedIn: 'root'
  })
  export class ListOfTotalToPayPerCartGroupByAuthorMapper {

    totalToPayPerCartMapper = new TotalToPayPerCartMapper();
    totalToPayPerAuthorMapper = new TotalToPayPerAuthorMapper();

    dtoToListOfTotalToPayPerCartGroupByAuthorMapper(listOfTotalToPayPerCartGroupByAuthor: any): ListOfTotalToPayPerCartGroupByAuthor {
      return {
        // variable del front: variable del back
        totalToPayPerAuthor: this.totalToPayPerAuthorMapper.dtoToTotalToPayPerAuthor(listOfTotalToPayPerCartGroupByAuthor.totalToPayPerAuthorDTO),
        listOfTotalToPayPerCart: listOfTotalToPayPerCartGroupByAuthor?.totalToPayPerCartDTOList
          ? listOfTotalToPayPerCartGroupByAuthor.totalToPayPerCartDTOList.map((totalToPayPerCartDTO: any) => {
            return this.totalToPayPerCartMapper.dtoToTotalToPayPerCart(totalToPayPerCartDTO)
          })
          : [],
      };
    }
  }
