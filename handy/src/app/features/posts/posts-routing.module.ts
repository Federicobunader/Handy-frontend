import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsDashboardComponent } from './components/posts-dashboard/posts-dashboard.component';
import { PostsDetailsComponent } from './components/posts-details/posts-details.component';
import { PostsViewComponent } from './components/posts-view/posts-view.component';
import { PostsArViewerComponent } from './components/posts-ar-viewer/posts-ar-viewer.component';


const routes: Routes = [
  {
    path: 'posts',
    component: PostsDashboardComponent,
  },
  {
    path: 'posts/details',
    component: PostsDetailsComponent,
  },
  {
    path: 'posts/edit/:id',
    component: PostsDetailsComponent,
  },
  {
    path: 'posts/view/:id',
    component: PostsViewComponent,
  },
  {
    path: 'posts/AR',
    component: PostsArViewerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
