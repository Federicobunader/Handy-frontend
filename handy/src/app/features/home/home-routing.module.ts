import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home.component';
import { LoggedHomeComponent } from './components/logged-home/logged-home.component';
import { NotLoggedHomeComponent } from './components/not-logged-home/not-logged-home.component';

const routes: Routes = [
  {
    path: 'notLoggedHome',
    component: NotLoggedHomeComponent,
  },
  {
    path: 'loggedHome',
    component: LoggedHomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
