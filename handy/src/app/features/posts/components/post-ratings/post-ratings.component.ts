import { Component } from '@angular/core';
import { PostRating } from 'src/app/core/models/postRating';
import { PostRatingService } from '../../services/post-rating-service/post-rating.service';

@Component({
    selector: 'app-post-rating',
    templateUrl: './post-ratings.component.html',
    styleUrls: ['./post-ratings.component.css']
  })
  export class DialogPostsRatingsComponent {

    constructor(private ratingService: PostRatingService){}
    ratings : PostRating [] = [];

    ngOnInit(){
    }

  }

