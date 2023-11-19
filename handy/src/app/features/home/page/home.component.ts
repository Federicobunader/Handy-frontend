import { Component, OnInit, ChangeDetectorRef, AfterContentInit  } from '@angular/core';
import { SessiontokenService } from '../services/sessiontoken.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserInfo } from 'src/app/core/models/userInfo';
import { GoogleApiService } from '../../login/services/google-service/google-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentInit {
  userInfo?: UserInfo

  constructor(private sessiontokenService: SessiontokenService, private readonly oAuthService: OAuthService, private googleAPI: GoogleApiService) {
  }
  ngAfterContentInit(): void {
    this.googleAPI.getUserInfo();
    this.getUserId();
  }


  userId: number | null = null;
  userName: string | null = null;
  userIsLogged = false; // initialize as false
  subFinished = false;

  // Método que trae el id del usuario que inicio sesion

  getUserId(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.userId = response.id;
          this.userName = `${response.firstName} ${response.lastName}`;
          this.userIsLogged = true; // Update the value here
          this.subFinished = true;
        },
        (error) => {
          console.error('Error al obtener el ID del usuario', error);
          this.userIsLogged = false; // Update the value here
          this.subFinished = true;
        }
      );
    } else {
      console.error('Token no encontrado en el almacenamiento de sesión');
    }
  }

  userLoggedValue(hasBeenLogged: boolean): void {
    if (hasBeenLogged) {
      this.getUserId();
    }
  }
}
