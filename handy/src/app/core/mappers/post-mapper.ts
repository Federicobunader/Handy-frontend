import { Injectable } from '@angular/core';
import { ProductMapper } from './product-mapper';
import { Post } from '../models/post';
import { AddressMapper } from './address-mapper';
import { UserMapper } from './user-mapper';
import { PhotoMapper } from './photo-mapper';
import { Photo } from '../models/photo';

@Injectable({
    providedIn: 'root'
  })
  export class PostMapper {

    productMapper = new ProductMapper();
    addressMapper = new AddressMapper();
    userMapper = new UserMapper();
    photoMapper = new PhotoMapper();


    dtoToPost(post: any): Post {
      return {
        // variable del front: variable del back
        id: post?.id ? post.id : 0,
        title: post?.title ? post.title : '',
        product: this.productMapper.dtoToProduct(post?.productDTO),
        address: this.addressMapper.dtoToAddress(post?.addressDTO),
        author: this.userMapper.dtoToUser(post?.authorDTO),
        stock: post?.stock ? post.stock : 0,
        isActive: post?.activeFlag != undefined ? post.activeFlag : true,
        isLeasing: post?.leasingFlag ? post.leasingFlag : false,
        photos: post?.photosDTO
          ? post.photosDTO.map((photo: any) => {
            return this.photoMapper.dtoToPhoto(photo)
          })
          : [],
        score: post?.score ? post.score : 0,
      };
    }

    postToDto(post: Post): any {
      return {
        // variable del front: variable del back
        id: post?.id ? post.id : 0,
        title: post?.title ? post.title : '',
        productDTO: this.productMapper.productToDto(post?.product),
        addressDTO: this.addressMapper.addressToDto(post?.address),
        authorDTO: this.userMapper.userToDto(post?.author),
        stock: post?.stock ? post.stock : 0,
        activeFlag: post?.isActive != undefined ? post.isActive : true,
        leasingFlag: post?.isLeasing ? post.isLeasing : false,
        photosDTO: post?.photos
          ? post.photos.map((photo: Photo) => {
            return this.photoMapper.photoToDto(photo)
          })
          : [],
      };
    }

  }
