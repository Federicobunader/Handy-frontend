import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { categoryURL, getProvincesURL } from 'src/app/core/constants/constants';
import { CategoryMapper } from 'src/app/core/mappers/category-mapper';
import { Category } from 'src/app/core/models/category';
import { SubCategory } from 'src/app/core/models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private mapper: CategoryMapper) { }


  getCategories(): Observable<Category[]> {
    return this.http
      .get(categoryURL)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((category: any) => {
            return this.mapper.dtoToCategory(category);
          });
        }),
      );
  }

  getSubCategories(categoryID: number): Observable<SubCategory[]> {
    return this.http
      .get(categoryURL + "/" + categoryID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((subCategory: any) => {
            return this.mapper.dtoToSubCategory(subCategory);
          });
        }),
      );
  }

  getSubCategoriesID(categoryID: number): Observable<any[]> {
    return this.http
      .get(categoryURL + "/subCategoriesByID/" + categoryID)
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  emptyCategory(): Category {
    return {
      id : 0,
      name : ''
    };
  }

  emptySubCategory(): SubCategory {
    return {
      id: 0,
      name : '',
      category: this.emptyCategory()
    };
  }
}
