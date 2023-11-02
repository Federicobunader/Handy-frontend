import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserInfo } from 'src/app/core/models/userInfo';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent{

  mailSnippets: string[] = [];
  userInfo?: UserInfo | null;

  constructor(private authService: AuthService,/* private googleApi: GoogleApiService*/){
  }
/*
  login() {
    if(this.isLoggedIn()){
      this.googleApi.initGoogleLoginFlow();
    }
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  logout() {
    this.googleApi.signOut()
  }

  /*async getEmails() {
    if (!this.userInfo) {
      return;
    }

    const userId = this.userInfo?.info.sub as string
    const messages = await lastValueFrom(this.googleApi.emails(userId))
    messages.messages.forEach( (element: any) => {
      const mail = lastValueFrom(this.googleApi.getMail(userId, element.id))
      mail.then( mail => {
        this.mailSnippets.push(mail.snippet)
      })
    });
  }*/
}
