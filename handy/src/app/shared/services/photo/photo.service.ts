import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { photoURL } from 'src/app/core/constants/constants';
import { PhotoMapper } from 'src/app/core/mappers/photo-mapper';
import { Photo } from 'src/app/core/models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements OnInit {

  constructor(private http: HttpClient, private mapper: PhotoMapper) { }

  private photos: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);
  private photosINFO: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);

  ngOnInit(): void {
    this.setPhotos([]);
    this.setPhotosINFO([]);
  }

  setPhotos(photosToSet : File[]){
     return this.photos.next(photosToSet);
  }

  getPhotos(): BehaviorSubject <any>{
    return this.photos;
  }

  setPhotosINFO(photosINFOToSet : Photo[]){
    return this.photosINFO.next(photosINFOToSet);
 }

  getPhotosINFO(): BehaviorSubject <any>{
    return this.photosINFO;
  }

  create(photo: File): Observable<Photo> {
    const formData = new FormData();
    formData.append('file', photo, photo.name);

    const data = { req: photo };
    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    formData.append('jsonReq', jsonBlob, 'data.json');

    this.setPhotos([]);
    this.setPhotosINFO([]);

    return this.http
      .post(
        photoURL,
        formData
      )
      .pipe(
        map((response: any) => {
          return this.mapper.dtoToPhoto(response);
        })
      );
  }

  emptyPhoto(): Photo {
    return {
      id: 0,
      url: '',
      name: ''
    }
  }

}
