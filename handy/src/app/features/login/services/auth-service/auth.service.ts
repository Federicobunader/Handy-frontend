import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { googleLoginURL, loginURL } from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY); //localStorage
  }

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username: username, password: password };
    return this.http.post(loginURL, loginData).pipe(
      tap((response: any) => {
        // Si la respuesta contiene un token, lo guardamos en el localStorage
        if (response.sessionToken) {
          this.setToken(response.sessionToken);
        }
      })
    );
  }

  googleLogin(email: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('email', email);
    return this.http.post(googleLoginURL, params).pipe(
      tap((response: any) => {
        // Si la respuesta contiene un token, lo guardamos en el localStorage
        if (response.sessionToken) {
          this.setToken(response.sessionToken);
        }
      }),
      catchError(error => {
        console.error('An error occurred:', error); // Log to console for now
        // Handle the error here or transform it before throwing it
        return throwError('Something went wrong; please try again later.');
      })
    )
  }

}
