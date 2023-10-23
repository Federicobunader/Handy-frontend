import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { SubCategory } from '../models/sub-category';
import { Brand } from '../models/brand';
import { CategoryMapper } from './category-mapper';

@Injectable({
    providedIn: 'root'
  })
  export class BrandMapper {

    categoryMapper = new CategoryMapper();

    dtoToBrand(brand: any): Brand {
      return {
        // variable del front: variable del back
        id: brand?.id ? brand.id : 0,
        name: brand?.name ? brand.name : '',
        category: this.categoryMapper.dtoToCategory(brand?.categoryDTO),
      };
    }

    brandToDto(brand: Brand): any {
      return {
        // variable del front: variable del back
        id: brand?.id ? brand.id : 0,
        name: brand?.name ? brand.name : '',
        categoryDTO: this.categoryMapper.categoryToDto(brand?.category),
      };
    }
  }
