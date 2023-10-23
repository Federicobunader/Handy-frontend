import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CategoryMapper } from './category-mapper';
import { BrandMapper } from './brand-mapper';

@Injectable({
    providedIn: 'root'
  })
  export class ProductMapper {

    categoryMapper = new CategoryMapper();
    brandMapper = new BrandMapper();

    dtoToProduct(product: any): Product {
      return {
        // variable del front: variable del back
        id: product?.id ? product.id : 0,
        name: product?.name ? product.name : '',
        description: product?.description ? product.description : '',
        brand: this.brandMapper.dtoToBrand(product?.brandDTO),
        subCategory: this.categoryMapper.dtoToSubCategory(product?.subCategoryDTO),
        rentalPrice: product?.rentalPrice ? product.rentalPrice : 0,
        salesPrice: product?.salesPrice ? product.salesPrice : 0,
        depositPrice: product?.depositPrice ? product.depositPrice: 0,
      };
    }

    productToDto(product: Product): any {
      return {
        // variable del front: variable del back
        id: product?.id ? product.id : 0,
        name: product?.name ? product.name : '',
        description: product?.description ? product.description : '',
        brandDTO: this.brandMapper.brandToDto(product?.brand),
        subCategoryDTO: this.categoryMapper.subCategoryToDto(product?.subCategory),
        rentalPrice: product?.rentalPrice ? product.rentalPrice : 0,
        salesPrice: product?.salesPrice ? product.salesPrice : 0,
        depositPrice: product?.depositPrice ? product.depositPrice: 0,
      };
    }
  }
