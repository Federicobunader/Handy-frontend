import { Injectable } from "@angular/core";
import { Photo } from "../models/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoMapper {

  dtoToPhoto(photo: any): Photo {

    return {
      // variable del front: variable del back
      id: photo?.id ? photo.id : 0,
      name: photo?.name ? photo.name : '',
      url: photo?.url ? photo.url : '',
    };

  }

  photoToDto(photo: Photo): any {
    return {
      // variable del front: variable del back
      id: photo?.id ? photo.id : 0,
      name: photo?.name ? photo.name : '',
      url: photo?.url ? photo.url : '',
    };
  }
}
