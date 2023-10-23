import { Component } from '@angular/core';
import { Rating } from 'src/app/core/models/rating';
import { PostRatingService } from '../../services/post-rating-service/post-rating.service';

@Component({
    selector: 'app-post-rating',
    templateUrl: './post-ratings.component.html',
    styleUrls: ['./post-ratings.component.css']
  })
  export class DialogPostsRatingsComponent {

    constructor(private ratingService: PostRatingService){}
    ratings : Rating [] = [];

    ngOnInit(){
    }

  }

