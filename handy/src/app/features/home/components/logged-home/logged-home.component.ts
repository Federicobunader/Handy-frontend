import { Component, OnInit } from '@angular/core';
import { SessiontokenService } from '../../services/sessiontoken.service';
import { UserInfo } from 'src/app/core/models/userInfo';
import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from 'src/app/features/login/services/google-service/google-api.service';

@Component({
  selector: 'logged-home',
  templateUrl: './logged-home.component.html',
  styleUrls: ['./logged-home.component.css']
})
export class LoggedHomeComponent implements OnInit {
  userName: string | null = null;
  userInfo?: UserInfo;

  constructor(private sessiontokenService: SessiontokenService) {
  }

  ngOnInit(): void {
    // Obtener el nombre de usuario y asignarlo a la propiedad userName
    this.getUserId();
  }

  getUserId(): void {
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.userName = response.firstName;
        },
        (error) => {
          console.error('Error al obtener el nombre de usuario', error);
        }
      );
    } else {
      console.error('El token de sesión es nulo');
    }
  }
}
