
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Photo } from 'src/app/core/models/photo';
import { PhotoService } from 'src/app/shared/services/photo/photo.service';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
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
    const dialogRef = this.dialog.open(ProgressSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
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
    dialogRef.close();
}

  deletePhoto(index: number) {
    this.photosINFO.splice(index, 1);
    this.photos.splice(index, 1);
  }

  handleFiles(files: FileList) {
    const dialogRef = this.dialog.open(ProgressSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
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
    dialogRef.close();
  }

  setInitialData(){

    this.photoService.getPhotos().subscribe(
      photos => (this.photos = photos)
    );

    this.photoService.getPhotosINFO().subscribe(
      photosINFO => (this.photosINFO = photosINFO)
    );
  }

  showDisplayMessage(){
    return (this.photos.length == 0 && this.displayMessage == 'Arrastrá y soltá la foto acá o') || (this.displayMessage != 'Arrastrá y soltá la foto acá o');
  }

}
