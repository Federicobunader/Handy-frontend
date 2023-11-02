import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../../../../core/models/user';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { map, takeUntil } from 'rxjs';
import { Photo } from 'src/app/core/models/photo';
import { PhotoService } from 'src/app/shared/services/photo/photo.service';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { Router } from '@angular/router';
import { PaymentMethod } from 'src/app/core/models/paymentMethod';
import { PaymentMethodService } from 'src/app/shared/services/payment-method/payment-method.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCheckMailComponent } from '../check-mail/check-mail/check-mail.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent{

  private $_destroyed = new Subject();
  selectedPaymentMethod: PaymentMethod [] = [];
  @Input() isEdit : Boolean = false;
  @Output() event = new EventEmitter<string>();

  changePasswordType() {
    var field = document.getElementById("passwordField");
    if(field != null){
      field.getAttribute('type') === "password" ? field.setAttribute('type','text') : field.setAttribute('type','password');
    }
  }

  changeRepeatPasswordType(){
    var secondField = document.getElementById("repeatPasswordField");
    if(secondField != null){
      secondField.getAttribute('type') === "password" ? secondField.setAttribute('type','text') : secondField.setAttribute('type','password');
    }
  }

  registerForm = new FormGroup({
    userFirstName: new FormControl ('', [Validators.required]),
    userLastName: new FormControl ('', [Validators.required]),
    userEmail: new FormControl ('', [Validators.required,Validators.email]),
    userDateBorn: new FormControl (new Date(), [Validators.required, this.ageValidator()]),
    username: new FormControl ('', [Validators.required]),
    userPassword: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()]{8,}$')]),
    userPasswordCheck: new FormControl ('', [Validators.required, this.passwordMatchValidator.bind(this)]),
    userTel: new FormControl ('', [Validators.required]),
    addressForm : new FormGroup ({
      address: new FormControl ('', [Validators.required]),
      location: new FormControl (0, [Validators.required]),
      province: new FormControl (0, [Validators.required]),
      postcode: new FormControl (0, [Validators.required, Validators.min(0)]),
      isApartment: new FormControl (false, [Validators.required]),
      apartment: new FormControl (''),
    }),
  })

  constructor(
     private userService: UserService,
     private photoService: PhotoService,
     private paymentMethodService: PaymentMethodService,
     private addressService: AddressService,
     private sessiontokenService: SessiontokenService,
     private router: Router,
     public dialog: MatDialog,
  ) {
    this.registerForm.get('userPasswordCheck')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator();
    });
    this.registerForm.get('userPassword')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator();
    });
    this.registerForm.get('userDateBorn')?.valueChanges.subscribe(() => {
      this.ageValidator();
    });
  }

  user: User = this.userService.emptyUser();
  photo: File [] = [];
  paymentMethods: PaymentMethod [] = [];
  createOrUpdateLabel: string = "REGISTRARSE";
  isAddressFormValid: boolean = false;

  passwordMatchValidator() {
    const originalPassword = this.registerForm?.get('userPassword')?.value;
    const confirmPassword =  this.registerForm?.get('userPasswordCheck')?.value;

    if (originalPassword === confirmPassword) {
      return null; // Las contraseñas coinciden, no hay error
    } else {
      return { passwordMismatch: true }; // Error personalizado para contraseñas que no coinciden
    }
  }

  getPhotoDisplayMessage(){
    return 'Arrastrá y soltá la foto acá o';
  }

  getPhotoLimitMessage(){
    return '';
  }

  setFormInfoToRegisterForm(): void {
    this.user.firstName = this.registerForm.get('userFirstName')?.value ?? '';
    this.user.lastName = this.registerForm.get('userLastName')?.value?? '';
    this.user.email = this.registerForm.get('userEmail')?.value ?? '';
    this.user.dateBorn = this.registerForm.get('userDateBorn')?.value ?? new Date();
    this.user.username = this.registerForm.get('username')?.value?.toLocaleLowerCase() ?? '';
    this.user.password = this.registerForm.get('userPassword')?.value ?? '';
    this.user.tel = this.registerForm.get('userTel')?.value ?? '';
  }

  setFormInfoToAddressForm(addressForm: FormGroup): void {

    this.registerForm.get('addressForm')?.get('province')?.setValue(addressForm.get('province')?.value);
    this.registerForm.get('addressForm')?.get('location')?.setValue(addressForm.get('location')?.value);
    this.registerForm.get('addressForm')?.get('postcode')?.setValue(addressForm.get('postcode')?.value);
    this.registerForm.get('addressForm')?.get('address')?.setValue(addressForm.get('address')?.value);
    this.registerForm.get('addressForm')?.get('isApartment')?.setValue(addressForm.get('isApartment')?.value);
    this.registerForm.get('addressForm')?.get('apartment')?.setValue(addressForm.get('apartment')?.value);

    this.user.address.location.province.id = addressForm.get('province')?.value ?? 0;
    this.user.address.location.id = addressForm.get('location')?.value ?? 0;
    this.user.address.location.province.country.id = addressForm.get('country')?.value ?? 0;
    this.user.address.postcode = addressForm.get('postcode')?.value ?? 0;
    this.user.address.street = addressForm.get('address')?.value ?? '';
    this.user.address.apartmentFlag = addressForm.get('isApartment')?.value ?? false;
    this.user.address.apartment = addressForm.get('apartment')?.value ?? '';

  }

  setAddressFormValidator(isAValidForm: boolean): void{
    this.isAddressFormValid = isAValidForm;
  }

  setDataInfoToForm(): void{

    this.registerForm.get('userFirstName')?.setValue(this.user.firstName);
    this.registerForm.get('userLastName')?.setValue(this.user.lastName);
    this.registerForm.get('userEmail')?.setValue(this.user.email);
    this.registerForm.get('userDateBorn')?.setValue(this.user.dateBorn);
    this.registerForm.get('username')?.setValue( this.user.username);
    this.registerForm.get('userTel')?.setValue(this.user.tel);
  }

  setPhotoInfoToUser(photos: Photo[]): void {
    this.user.photo = photos;
  }

  setPhotoToUser(photos: File[]): void {
    this.photo = photos;
  }

  generateAndSendCode(){
    const dialogRef = this.dialog.open(DialogCheckMailComponent, {
      width: '600px',
      data: {dataUser: this.user},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Aquí puedes usar el valor ingresado por el usuario (result)

        this.createOrUpdateUser()
      }
    });
  }

  createOrUpdateUser(){
    this.userService
          .register(this.user, this.photo)
          .pipe(takeUntil(this.$_destroyed))
          .subscribe(
            () => {
              // Operación exitosa: mostrar notificación de éxito
              const message = this.isEdit ? 'Cambios guardados exitosamente' : '¡Usuario creado exitosamente!'
              if(!this.isEdit){
                Swal.fire('Exito', message, 'success');
                this.router.navigateByUrl('/login');
              } else {
                Swal.fire('Exito', message, 'success');
                this.event.emit('Shut register toggle');
              }
            },
            (error) => {
              // Error en la operación: mostrar notificación de error con el mensaje del error
              Swal.fire('Error', 'Usuario o Email repetidos', 'error');
              console.log('ERROR:', error.message);
            }
          );
  }

  saveOrUpdate() {
    if(this.user.photo.length === 1)
    {
      if (this.registerForm.valid && this.isAddressFormValid) {
        this.setFormInfoToRegisterForm();
        if(!this.isEdit){
          this.generateAndSendCode()
        }else{
          this.createOrUpdateUser();
        }
      }
    }
    else{
      Swal.fire('Error', 'Cargar foto de perfil', 'warning');
    }
  }

  getUser(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService
      .getUser(token)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: User) =>{
          this.addressService.setAddress(response.address);
          this.user = response;
          this.disableFields();
        }
        ))
      .subscribe(() =>
      {
        this.setDataInfoToForm();
        this.addressService.setAddress(this.user.address);
        this.photoService.setPhotosINFO(this.user.photo);
      });
    } else {
      console.error('El token de sesión es nulo');
    }
  }

  disableFields(){
    this.registerForm.get('username')?.disable();
    this.registerForm.get('userEmail')?.disable();
    this.registerForm.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  get passwordsDontMatch(){
    var field1 = document.getElementById("passwordField") as HTMLInputElement | null;
    var field2 = document.getElementById("repeatPasswordField") as HTMLInputElement | null;

    return field1 != null && field2 != null ? (field1.value == '' || field2.value == '' ? false : field1.value != field2.value) : false;
  }

  get buttonLabel(){
    return this.isEdit ? 'GUARDAR CAMBIOS' : 'REGISTRATE';
  }

  get passwordLabel(){
    return this.isEdit ? 'Indicá tu contraseña si querés hacer cambios' : 'Contraseña';
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const birthDate = new Date(control.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear() -
            ((today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate())) ? 1 : 0);
        return age >= 18 ? null : { 'ageInvalid': true };
    };
}

}
