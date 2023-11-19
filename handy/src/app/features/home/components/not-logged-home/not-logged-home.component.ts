import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GoogleApiService} from "../../../login/services/google-service/google-api.service";
import {UserService} from "../../../../shared/services/user/user.service";
import {AuthService} from "../../../login/services/auth-service/auth.service";
import {
  googleAccessTokenKey,
  googleEmailKey,
  googleFirstNameKey,
  googleLastNameKey
} from "../../../../core/constants/constants";

@Component({
  selector: 'not-logged-home',
  templateUrl: './not-logged-home.component.html',
  styleUrls: ['./not-logged-home.component.css']
})
export class NotLoggedHomeComponent implements OnInit {

  private readonly GOOGLE_ACCESS_TOKEN_KEY = 'google_access_token';
  private readonly GOOGLE_EMAIL_KEY = 'google_email';
  private readonly GOOGLE_FIRST_NAME_KEY = 'google_first_name';
  private readonly GOOGLE_LAST_NAME_KEY = 'google_last_name';

  @Output() userLogged: EventEmitter<boolean> = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private googleApiService: GoogleApiService,
              private userService: UserService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment?.includes('access_token')) {
        const queryParams = new URLSearchParams(fragment);
        const access_token = queryParams.get('access_token');
        if (access_token) {
          this.googleApiService.getUserInfoWithTokenObs(access_token).subscribe( value => {
            const firstName = value.given_name;
            const lastName = value.family_name;
            const email = value.email;
            this.setSessionStorageItems(access_token, email, firstName, lastName);
            this.userService.checkIfUserAlreadyExistWithMail(email).subscribe((response) => {
              if (response) {
                this.authService.googleLogin(email).subscribe( (response) => {
                  this.userHasBeenLogged();
                });
              } else {
                this.router.navigateByUrl('/register')
              }
            })
          })
        }
      }
    });
  }

  userId = null;

  get userIsLogged(){
    return this.userId != null;
  }

  setSessionStorageItems(accessToken: string, email: string, firstName: string, lastName: string) {
    sessionStorage.setItem(googleAccessTokenKey, accessToken);
    sessionStorage.setItem(googleEmailKey, email);
    sessionStorage.setItem(googleFirstNameKey, firstName);
    sessionStorage.setItem(googleLastNameKey, lastName);
  }

  userHasBeenLogged() {
    this.userLogged.emit(true);
  }

}
