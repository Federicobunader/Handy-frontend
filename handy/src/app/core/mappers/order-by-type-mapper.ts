import { Injectable } from '@angular/core';
import { OrderByType } from '../models/orderByType';

@Injectable({
    providedIn: 'root'
  })
  export class OrderByTypeMapper {

    dtoToOrderByType(orderByType: any): OrderByType {
      return {
        // variable del front: variable del back
        id: orderByType?.id ? orderByType.id : 0,
        name: orderByType?.name ? orderByType.name : '',
      };
    }

    orderByTypeToDto(orderByType: OrderByType): any {
      return {
        // variable del front: variable del back
        id: orderByType?.id ? orderByType.id : 0,
        name: orderByType?.name ? orderByType.name : '',
      };
    }
  }
