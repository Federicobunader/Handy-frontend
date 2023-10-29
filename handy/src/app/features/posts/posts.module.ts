import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsDashboardComponent } from './components/posts-dashboard/posts-dashboard.component';
import { PostsComponent } from './page/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsDetailsComponent } from './components/posts-details/posts-details.component';
import { DialogPostsRatingsComponent } from './components/post-ratings/post-ratings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PostsViewComponent } from './components/posts-view/posts-view.component';
import { PostRecommendationComponent } from './components/post-recommendation/post-recommendation.component';
import { DialogPostPhotoDetailsComponent } from './components/post-photos-details/post-photos-details.component';
import { CartRoutingModule } from '../cart/cart-routing.module';
import { DialogPostsCommentDetailsComponent } from './components/posts-comment-details/posts-comment-details.component';
import { PostsCommentDashboardComponent } from './components/posts-comment-dashboard/posts-comment-dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogRatingDetailsComponent } from '../../shared/components/rating-details/rating-details.component';
import { PostsArViewerComponent } from './components/posts-ar-viewer/posts-ar-viewer.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsDashboardComponent,
    PostsDetailsComponent,
    PostsViewComponent,
    PostRecommendationComponent,
    DialogPostsCommentDetailsComponent,
    PostsCommentDashboardComponent,
    DialogPostsRatingsComponent,
    DialogRatingDetailsComponent,
    DialogPostPhotoDetailsComponent,
    PostsArViewerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostsRoutingModule,
    MatDialogModule,
    CartRoutingModule,
    MatExpansionModule,
  ],
  exports: [
    PostsViewComponent,
    PostsDashboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostsModule { }
