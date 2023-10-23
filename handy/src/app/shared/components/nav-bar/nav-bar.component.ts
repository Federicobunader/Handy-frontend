import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private readonly TOKEN_KEY = 'token';
  constructor(private navigationService: NavigationService, private router: Router, private oAuthService: OAuthService) { } 

  @Input() navBarWithButtons! : boolean;
  @Input() showCart : boolean = true;

  ngOnInit(): void {}

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  logoutauth() {
    this.navigationService.logout().subscribe(
      () => {
        // El cierre de sesión fue exitoso, realizar acciones adicionales si es necesario
        this.clearToken();
        window.location.reload();
      },
      (error: any) => { // Especifica el tipo de datos 'any' para el parámetro error
        // El cierre de sesión falló, manejar el error si es necesario
        console.error('Error al cerrar sesión', error);
        //Swal.fire('Error', 'Se cerró sesión correctamente', 'error');
      }
    );
  }

  signOut() {
    this.oAuthService.logOut()
  }

}
