import { Injectable } from "@angular/core";
import { Cart } from "../models/cart";
import { PostMapper } from "./post-mapper";
import { UserMapper } from "./user-mapper";

@Injectable({
  providedIn: 'root'
})
export class CartMapper {
  postMapper = new PostMapper();
  userMapper = new UserMapper();

  dtoToCart (cart: any): Cart {
    return {
      // variable del front: variable del back
      id: cart?.id ? cart.id : 0,
      amount: cart?.amount ? cart.amount : 1,
      isLeasing: cart?.leasingFlag ? cart.leasingFlag : false,
      dateFrom: cart?.dateFromDTO ? cart.dateFromDTO : null,
      dateTo : cart?.dateToDTO ? cart.dateToDTO : null,
      rentalDays: cart?.rentalDays ? cart.rentalDays : 0,
      remainingDays: cart?.remainingRentalDays ? cart.remainingRentalDays : 0,
      isPurchased: cart?.purchasedFlag ? cart.purchasedFlag : false,
      userAlreadyRatedPost: cart?.userAlreadyRatedPost != undefined ? cart.userAlreadyRatedPost : false,
      userAlreadyRatedPostAuthor: cart?.userAlreadyRatedPostAuthor != undefined ? cart.userAlreadyRatedPostAuthor : false,
      post: this.postMapper.dtoToPost(cart.postDTO),
      user: this.userMapper.dtoToUser(cart.userDTO),
      returnedFlag: cart?.returnedFlag != undefined ? cart.returnedFlag : false,
    };
  }

  cartToDto(cart: Cart): any {
    return {
      // variable del front: variable del back
      id: cart?.id ? cart.id : 0,
      amount: cart?.amount ? cart.amount : 1,
      leasingFlag: cart?.isLeasing ? cart.isLeasing : false,
      dateFromDTO: cart?.dateFrom ? cart.dateFrom : null,
      dateToDTO : cart?.dateTo ? cart.dateTo : null,
      rentalDays: cart?.rentalDays ? cart.rentalDays : 0,
      purchasedFlag: cart?.isPurchased ? cart.isPurchased : false,
      postDTO: this.postMapper.postToDto(cart.post),
      userDTO: this.userMapper.userToDto(cart.user),
      returnedFlag: cart?.returnedFlag != undefined ? cart.returnedFlag : false,
    };
  }
}
