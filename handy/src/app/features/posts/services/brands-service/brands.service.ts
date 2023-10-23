import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { brandURL } from 'src/app/core/constants/constants';
import { BrandMapper } from 'src/app/core/mappers/brand-mapper';
import { Brand } from 'src/app/core/models/brand';
import { CategoriesService } from '../categories-service/categories.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(
    private http: HttpClient,
    private mapper: BrandMapper,
    private categoryService: CategoriesService,
    ) { }

  getBrands(categoryID: number): Observable<Brand[]> {
    return this.http
      .get(brandURL + "/" + categoryID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((brand: any) => {
            return this.mapper.dtoToBrand(brand);
          });
        }),
      );
  }

  getBrandsID(categoryID: number): Observable<any[]> {
    return this.http
      .get(brandURL + "/brandsByCategoryID/" + categoryID)
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  emptyBrand(): Brand {
    return {
      id: 0,
      name : '',
      category: this.categoryService.emptyCategory(),
    };
  }
}
