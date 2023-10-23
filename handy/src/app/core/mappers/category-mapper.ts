import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { SubCategory } from '../models/sub-category';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryMapper {

    dtoToSubCategory(subCategory: any): SubCategory {
      return {
        // variable del front: variable del back
        id: subCategory?.id ? subCategory.id : 0,
        name: subCategory?.name ? subCategory.name : '',
        category: this.dtoToCategory(subCategory?.categoryDTO),
      };
    }

    subCategoryToDto(subCategory: SubCategory): any {
      return {
        // variable del front: variable del back
        id: subCategory?.id ? subCategory.id : 0,
        name: subCategory?.name ? subCategory.name : '',
        categoryDTO: this.categoryToDto(subCategory?.category),
      };
    }


    dtoToCategory(category: any): Category {
      return {
        // variable del front: variable del back
        id: category?.id ? category.id : 0,
        name: category?.name ? category.name : '',
      };
    }

    categoryToDto(category: Category): any {
      return {
        //Variable del back: Variable del front
        id: category?.id ? category.id : 0,
        name: category?.name ? category.name : '',
      };
    }

  }
