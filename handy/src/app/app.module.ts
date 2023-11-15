import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
import { PostsModule } from './features/posts/posts.module';
import { RegisterModule } from './features/register/register.module';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './features/cart/cart.module';
import { PurchaseModule } from './features/purchase/purchase.module';
import { ProfileModule } from './features/profile/profile.module';
import { ChatModule } from './features/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    PostsModule,
    RegisterModule,
    CartModule,
    PurchaseModule,
    SharedModule,
    ProfileModule,
    ChatModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
