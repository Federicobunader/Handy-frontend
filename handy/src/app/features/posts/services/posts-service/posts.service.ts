import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { filteredPostsURL, postURL } from '../../../../core/constants/constants';
import { PostMapper } from '../../../../core/mappers/post-mapper';
import { Post } from '../../../../core/models/post';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CategoriesService } from '../categories-service/categories.service';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { BrandsService } from '../brands-service/brands.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private mapper: PostMapper,
    private userService: UserService,
    private categoryService: CategoriesService,
    private addressService: AddressService,
    private brandService: BrandsService,
    )

    {
      this.mapper = new PostMapper();
    }

    private post: BehaviorSubject<Post> = new BehaviorSubject<Post>(this.emptyPost());

    setPost(postToSet : Post){
       return this.post.next(postToSet);
    }

    getPost(): BehaviorSubject <any>{
      return this.post;
    }

    getActivePostsBySubCategoryAndLocationAndProvince(
      subCategoryID: number[],
      categoryID: number | undefined,
      locationID: number[],
      brandsID: number[],
      provinceID: number | undefined,
      orderBy: string,
      activeFlag: boolean
    ): Observable<Post[]> {
      let params = new HttpParams();

      if (subCategoryID && subCategoryID.length) {
          params = params.set('subCategoryID', subCategoryID.join(','));
      }

      if (brandsID && brandsID.length) {
        params = params.set('brandsID', brandsID.join(','));
      }

      if (provinceID) {
        params = params.set('provinceID', provinceID.toString());
      }

      if (categoryID) {
        params = params.set('categoryID', categoryID.toString());
      }

      if (locationID && locationID.length) {
          params = params.set('locationID', locationID.join(','));
      }

      if (orderBy) {
          params = params.set('orderBy', orderBy);
      }

      if (activeFlag !== null && activeFlag !== undefined) {
          params = params.set('activeFlag', activeFlag.toString());
      }

      return this.http.get<any[]>(filteredPostsURL, { params })
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((post: any) => {
             return this.mapper.dtoToPost(post);
          });
        })
      );
  }

  getPostByAuthor(userID: number): Observable<Post[]> {
    return this.http
      .get(postURL + '/postByAuthor/' + userID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((post: any) => {
             return this.mapper.dtoToPost(post);
          });
        })
      );
  }

  getAllPosts(provinceID: number): Observable<Post[]> {
    return this.http
      .get(postURL + '/allPosts/' + provinceID)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((post: any) => {
             return this.mapper.dtoToPost(post);
          });
        })
      );
  }

  getPostByID(postID: number): Observable<Post> {
    return this.http
      .get(postURL + '/' + postID)
      .pipe(
        map((response) => {
          return this.mapper.dtoToPost(response);
        })
      );
  }


  create(post: Post, photos: File []): Observable<Post> {
    const formData = new FormData();
    formData.append('postDTO', new Blob([JSON.stringify(this.mapper.postToDto(post))], { type: 'application/json' }));

    if(photos.length === 0)
      formData.append(`photos`, new Blob([JSON.stringify(photos)]));

    for (let i = 0; i < photos.length; i++) {
      formData.append(`photos`, new Blob([JSON.stringify(photos)]));
    }

    return this.http
      .post(
        postURL,
        formData
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToPost(response);
        })
      );
  }

  emptyPost(): Post{
    return {
      id: 0,
      title: '',
      product: {
        id : 0,
        name : '',
        description: '',
        brand: this.brandService.emptyBrand(),
        subCategory : this.categoryService.emptySubCategory(),
        rentalPrice: 0,
        salesPrice: 0,
        depositPrice: 0,
      },
      address: this.addressService.emptyAddress(),
      author: this.userService.emptyUser(),
      stock: 0,
      isActive: false,
      isLeasing: false,
      photos: [],
    }
  }
}
