
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Photo } from 'src/app/core/models/photo';
import { PhotoService } from 'src/app/shared/services/photo/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit  {

  @Output() photosINFOToTransfer = new EventEmitter<Photo[]>();
  @Output() photosToTransfer = new EventEmitter<File[]>();
  @Input() maxPhotos! : number;
  @Input() displayMessage! : string;
  @Input() limitMessage! : string;

  photosINFO: Photo[] = [];
  photos: File[] = [];

  private $_destroyed = new Subject();

  constructor(
    private photoService: PhotoService,
  ) {}


  ngOnInit(): void {
    this.setInitialData();
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onFileChange(event: any) {
    if (this.photosINFO.length >= this.maxPhotos) {
      return;
    }
    const file = event.target.files[0];

    if (file) {
      // Process the file. For example, read it as a Data URL to display as an image.
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const photo: Photo = {
          id: this.photos.length + 1,
          name: file.name,
          url: e.target.result,
        };
        this.photosINFO.push(photo);
        this.photos.push(file);
      };
      this.photosToTransfer.emit(this.photos);
      this.photosINFOToTransfer.emit(this.photosINFO);

      reader.readAsDataURL(file);
  }
}

  deletePhoto(index: number) {
    this.photosINFO.splice(index, 1);
    this.photos.splice(index, 1);
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      if (this.photos.length >= this.maxPhotos) {
        return;
      }

      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const photo: Photo = {
          id: this.photos.length + 1,
          name: file.name,
          url: e.target.result,
        };

        this.photosINFO.push(photo);
        this.photos.push(file);
      };
      this.photosToTransfer.emit(this.photos);
      this.photosINFOToTransfer.emit(this.photosINFO);
      reader.readAsDataURL(file);
    }
  }

  setInitialData(){

    this.photoService.getPhotos().subscribe(
      photos => (this.photos = photos)
    );

    this.photoService.getPhotosINFO().subscribe(
      photosINFO => (this.photosINFO = photosINFO)
    );
  }

}
