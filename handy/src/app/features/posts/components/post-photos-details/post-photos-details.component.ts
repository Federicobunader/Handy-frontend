import { Component } from '@angular/core';
import { Post } from 'src/app/core/models/post';
import { PostService } from '../../services/posts-service/posts.service';

@Component({
  selector: 'app-post-photos',
  templateUrl: './post-photos-details.component.html',
  styleUrls: ['./post-photos-details.component.css']
})
export class DialogPostPhotoDetailsComponent {

  constructor(private postService: PostService){}

  post : Post = this.postService.emptyPost();
  photoToShow : any;
  photoNumber : any = 1;
  showPrevious : Boolean = false;
  showNext : Boolean = true;

  ngOnInit(){
    this.photoToShow = this.post.photos[0].url;
    this.photoNumber = 1;
    this.showNext = this.post.photos.length != 1;
  }

  previousPicture(){
    let photoIndex = this.photoNumber - 1;
    for(let i = 0; i < this.post.photos.length; i++){
      if(i == photoIndex){
        this.photoNumber = i;
        this.photoToShow = this.post.photos[i - 1].url;
        break;
      }
    }
    this.showNext = this.photoNumber != this.post.photos.length;
    this.showPrevious = this.photoNumber != 1;
  }

  nextPicture(){
    let photoIndex = this.photoNumber - 1;
    for(let i = 0; i < this.post.photos.length; i++){
      if(i == photoIndex){
        this.photoNumber = i + 2;
        this.photoToShow = this.post.photos[i + 1].url;
        break;
      }
    }
    this.showNext = this.photoNumber != this.post.photos.length;
    this.showPrevious = this.photoNumber != 1;
  }

}
