import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent {

  constructor(private router: Router) {}

  showEditarDatos: boolean = false;
  showEditarPassword: boolean = false;
  showPublicaciones: boolean = false;
  showAlquileres: boolean = false;
  showInbox: boolean = false;
  showVentas: boolean = false;
  actionViewMyPost: string = "viewMyPost";

  toggleEditarDatos() {
    this.showEditarDatos = !this.showEditarDatos;
    this.showEditarPassword = false;
    this.showPublicaciones = false;
    this.showAlquileres = false;
    this.showInbox = false;
    this.showVentas = false;
  }

  toggleEditarPassword() {
    this.showEditarPassword = !this.showEditarPassword;
    this.showPublicaciones = false;
    this.showAlquileres = false;
    this.showInbox = false;
    this.showEditarDatos = false;
    this.showVentas = false;
  }

  togglePublicaciones() {
    this.showPublicaciones = !this.showPublicaciones;
    this.showEditarDatos = false;
    this.showEditarPassword = false;
    this.showAlquileres = false;
    this.showInbox = false;
    this.showVentas = false;
  }

  toggleAlquileres() {
    this.showAlquileres = !this.showAlquileres;
    this.showPublicaciones = false;
    this.showEditarDatos = false;
    this.showInbox = false;
    this.showEditarPassword = false;
    this.showVentas = false;
  }

  toggleVentas(){
    this.showVentas = !this.showVentas;
    this.showPublicaciones = false;
    this.showEditarDatos = false;
    this.showInbox = false;
    this.showEditarPassword = false;
    this.showAlquileres = false;
  }

  toggleInbox() {
    this.showInbox = !this.showInbox;
    this.showPublicaciones = false;
    this.showAlquileres = false;
    this.showEditarDatos = false;
    this.showEditarPassword = false;
    this.showVentas = false;
  }

  shutToggle(message: String){
    this.showEditarDatos = false;
    this.showEditarPassword = false;
  }
}
