import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject, map, takeUntil } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/core/models/user';
import { AuthService } from '../auth-service/auth.service';
import { UserInfo } from 'src/app/core/models/userInfo';
import { PhotoService } from 'src/app/shared/services/photo/photo.service';

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
  //showDebugInformation: true,
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  //gmail = 'https://gmail.googleapis.com'

  userProfileSubject = new Subject<UserInfo>()
  private $_destroyed = new Subject();
  user: User = this.userService.emptyUser();
  userInfo?: UserInfo;
  private readonly TOKEN_KEY = 'token';
  //isGoogleLogin : boolean = true;

  constructor(
    private oAuthService: OAuthService,
    private userService: UserService,
    private photoService: PhotoService,
    private authService: AuthService) {
      console.log("Entre al login de google")
   // confiure oauth2 service
   this.oAuthService.configure(oAuthConfig);
   // manually configure a logout url, because googles discovery document does not provide it
   this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";


  }

  initGoogleLoginFlow(): void {
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {
         if (!this.oAuthService.hasValidAccessToken() && sessionStorage.getItem(this.TOKEN_KEY) == null) {//&&this.isGoogleLogin == true
          this.oAuthService.initLoginFlow();
         } else {
          this.oAuthService.loadUserProfile().then( (userProfile) => {
             this.userProfileSubject.next(userProfile as UserInfo)
           })
         }
         console.log("Ensgswgswrgwswgogle")
         this.getUserInfo();
       })
     });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  //setIsGoogleLogin(value : boolean): void {
   // this.isGoogleLogin = value;
  //}

  signOut() {
    this.oAuthService.logOut()
  }


  getUserInfo() {
    this.userProfileSubject.subscribe( info => {
      this.userInfo = info
      console.log(this.userInfo)
      this.loginGoogleUser()
    })
  }

  loginGoogleUser(){
    this.getUserInfo();
    console.log("Entre al login de google")
    console.log(this.userInfo)

    var userAlreadyExistFlag : boolean = false;
    var user: User = this.userService.emptyUser();

    if(this.userInfo != null){

      console.log("Entre al if del usuario distinto de null")
        this.userService
        .checkIfUserAlreadyExistWithMail(this.userInfo.info.email)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: boolean) => (
            userAlreadyExistFlag = response))
        )
      .subscribe(() => {
        console.log(userAlreadyExistFlag)
        if(!userAlreadyExistFlag){
          console.log("Entre al if del userAlreadyExistFlag")
          user.email = this.userInfo!.info.email;
          let name = this.userInfo!.info.name.split(' ');
          user.firstName = name[0];
          user.lastName = name[1];
          user.photo[0] = this.photoService.emptyPhoto();
          user.photo[0].url = this.userInfo!.info.picture;
          user.username = this.userInfo!.info.email.concat(this.userInfo!.info.sub);

          console.log("El user antes de llamar al metodo de registrarse:",user)
          this.callRegisterMethod(user);
        }
        else{
          this.login(this.userInfo!.info.email);
        }
      });
    }
  }

  callRegisterMethod(user: User){
    console.log("Entre al registrarse")
    console.log(this.user)
    this.userService
          .register(user, [])
          .pipe(takeUntil(this.$_destroyed))
          .subscribe(() => this.login(user.email));
  }

  login(email: string){
    this.authService.googleLogin(email).subscribe();
  }

}
