import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { ARURL } from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PostsArService {

  constructor(private http: HttpClient) {}

  getModel(modelName: string) {
    return this.http.get<Blob>(ARURL + '/modelByName/' + modelName, {responseType: 'blob' as 'json'})
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error fetching the model:', error);
          throw error; // or return some default/error value using of() from rxjs
        })
      );
  }

  getModelTexture(modelName: string, textureName: string) {
    return this.http.get<Blob>(ARURL + '/modelTexture/' + modelName + '/' + textureName, {responseType: 'blob' as 'json'})
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error fetching the model:', error);
          throw error; // or return some default/error value using of() from rxjs
        })
      );
  }
}
