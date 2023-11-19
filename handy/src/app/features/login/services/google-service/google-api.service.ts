import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {Observable, Subject} from 'rxjs';
import {UserService} from 'src/app/shared/services/user/user.service';
import {AuthService} from '../auth-service/auth.service';
import {UserInfo} from 'src/app/core/models/userInfo';
import {PhotoService} from 'src/app/shared/services/photo/photo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '995081710912-3lh2jc12ek0vh1svva3d04opi9suev64.apps.googleusercontent.com',
  scope: 'openid profile email',
  //responseType: 'code',
  //useSilentRefresh: true, // Production should always use HTTPS, but local dev might not
  //disablePKCE: false, // This activates PKCE
  //scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
  showDebugInformation: true,
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  private googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
  userProfileSubject = new Subject<UserInfo>()

  constructor(
    private oAuthService: OAuthService,
    private userService: UserService,
    private http: HttpClient,
    private photoService: PhotoService,
    private authService: AuthService
  ) {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    //this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";
  }

  loginWithGoogle(): void {
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }
      })
    });
  }

  logout(): void {
    this.oAuthService.logOut();
  }

  getUserInfo(): any {
    const claims = this.oAuthService.getIdentityClaims();
    return claims ? claims : null;
  }

  getUserInfoWithToken(accessToken: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http
      .get(this.googleUserInfoUrl, { headers })
      .toPromise()
      .then((response: any) => response)
      .catch((error: any) => {
        console.error('Error fetching user info:', error);
        throw error;
      });
  }

  getUserInfoWithTokenObs(accessToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get(this.googleUserInfoUrl, { headers });
  }
}
