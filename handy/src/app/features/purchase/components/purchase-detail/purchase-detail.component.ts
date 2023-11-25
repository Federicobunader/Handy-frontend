import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { Purchase } from 'src/app/core/models/purchase';
import { User } from 'src/app/core/models/user';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { PurchaseService } from '../../services/purchase.service';
import { PaymentMethodService } from 'src/app/shared/services/payment-method/payment-method.service';
import { PaymentMethod } from 'src/app/core/models/paymentMethod';
import { TotalToPayPerAuthorService } from 'src/app/features/cart/services/total-to-pay-per-author-service/totalToPayPerAuthor.service';
import { TotalToPayPerAuthor } from 'src/app/core/models/total-to-pay-per-author';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMercadoPagoService } from 'src/app/features/payment-mercado-pago/services/payment-mercado-pago.service';
import { PaymentUalaBisService } from 'src/app/features/payment-uala-bis/services/payment-uala-bis.service';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit{

  address: FormControl;
  private $_destroyed = new Subject();

  constructor(
    private addressService: AddressService,
    private router: Router,
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private purchaseService: PurchaseService,
    private mercadoPagoService: PaymentMercadoPagoService,
    private ualaBisService: PaymentUalaBisService,
    private paymentMethodService: PaymentMethodService,
    private totalToPayPerAuthorService: TotalToPayPerAuthorService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.address = new FormControl(addressService.emptyAddress());
  }

  user: User = this.userService.emptyUser();
  purchase: Purchase = this.purchaseService.emptyPurchase()
  totalToPayPerAuthor: TotalToPayPerAuthor = this.totalToPayPerAuthorService.emptyTotalToPayPerAuthor();
  totalToPayPerAuthorID : number = 0;
  isTheBuyerAddress: boolean = false;
  paymentMethods : PaymentMethod [] = [];
  isPurchased = false;
  isPurchasedSection = true;
  toggleHome = false;
  toggleDelivery = false;
  togglePaymentMethod1 = false;
  togglePaymentMethod2 = false;
  togglePaymentMethod3 = false;
  buyerFullName: any = '';
  buyerEmail: any = '';
  buyerTel: any = '';
  sellerEmail: any = '';
  sellerTel: any = '';
  submitLabel = 'PROCEDER AL PAGO';
  availablePaymentMethods: PaymentMethod [] = [];

  ngOnInit(): void {
    var buyerIdParam: any = 0;
    this.route.params.subscribe(params => { this.totalToPayPerAuthorID = params['id']; });
    this.route.queryParamMap.subscribe(param => this.setAvailablePaymentMethods(param.get('paymentMethods')));
    this.route.queryParamMap.subscribe(param => buyerIdParam = param.get('buyerId'));

    if(buyerIdParam){
      this.purchase.buyer.id = buyerIdParam;
      this.route.queryParamMap.subscribe(param => this.buyerFullName = param.get('buyerName'));
      this.route.queryParamMap.subscribe(param => this.buyerEmail = param.get('buyerEmail'));
      this.route.queryParamMap.subscribe(param => this.buyerTel = param.get('buyerPhone'));
      this.getPurchase();
      this.getCurrentUser();
    } else {
      this.getUser();
    }

    this.getPaymentMethods();
    this.setTotalToPayPerAuthorAndAuthor();
  }

  acceptsCash = false;
  acceptsMP = false;
  acceptsUala = false;
  setAvailablePaymentMethods(ids: any){
    if(ids.includes('1')){
      this.availablePaymentMethods.push({ id: 1, name: 'Efectivo' });
      this.acceptsCash = true;
    }
    if(ids.includes('2')){
      this.availablePaymentMethods.push({ id: 2, name: 'Mercado Pago' });
      this.acceptsMP = true;
    }
    if(ids.includes('3')){
      this.availablePaymentMethods.push({ id: 3, name: 'Uala' });
      this.acceptsUala = true;
    }
  }

  getPurchase(){
    this.purchaseService
        .getPurchaseByTotalToPayPerAuthorIDAndBuyerID(this.totalToPayPerAuthorID,this.purchase.buyer.id)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: Purchase) => {
            if(response.id != 0){
              this.addressService.setAddress(response.deliveryPoint);
              this.purchase = response
            }
          }
          )
        )
        .subscribe(() =>{
          this.sellerEmail = this.purchase.seller.email;
          this.sellerTel = this.purchase.seller.tel;
          this.addressService.setAddress(this.purchase.deliveryPoint);
          this.getPaymentMethods();
          if(this.purchase.id){
            this.isPurchased = true;
            this.setPaymentMethod(this.purchase.paymentMethod.name);
            if(this.purchase.deliveryPoint.street != ""){
              this.loadAddressFromUser();
            } else {
              this.clearAddress();
            }
          }
        });
  }


  getPaymentMethods(){
    this.paymentMethodService
    .getPaymentMethods()
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: PaymentMethod[]) => (
          this.paymentMethods = response))
      )
    .subscribe();
  }

  methodSelected = false;
  method: PaymentMethod = {name: '', id: 0};
  setPaymentMethod(selectedMethod: String){

    this.paymentMethods.forEach( paymentMethod => {
      if(paymentMethod.name == selectedMethod){
        this.method = paymentMethod;
        if(this.method.name == 'Efectivo'){
          this.submitLabel = 'EFECTUAR COMPRA';
        } else {
          this.submitLabel = 'PROCEDER AL PAGO';
        }
      }
    });

    this.togglePaymentMethod1 = selectedMethod == 'Efectivo';
    this.togglePaymentMethod2 = selectedMethod == 'Mercado Pago';
    this.togglePaymentMethod3 = selectedMethod == 'Uala';

    if(!this.isPurchased){
      this.purchase.paymentMethod = this.method;
      this.methodSelected = this.purchase.paymentMethod.id != 0;
    }
  }

  get enablePurchaseButton(){
    return this.methodSelected && this.deliverySelected;
  }

  setTotalToPayPerAuthorAndAuthor(){
    this.totalToPayPerAuthorService
    .getTotalToPayByAuthorID(this.totalToPayPerAuthorID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: TotalToPayPerAuthor) => (
          this.totalToPayPerAuthor = response))
      )
    .subscribe(() => {
      this.purchase.totalToPayPerAuthor = this.totalToPayPerAuthor;
      this.purchase.seller = this.totalToPayPerAuthor.author;
      this.totalToPayPerAuthor.totalToPay = this.totalToPayPerAuthor.totalToPay;
    });
  }

  getCurrentUser(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('El token de sesión es nulo');
    }
  }

  getUser(){
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.purchase.buyer = response;
          this.buyerFullName = response.firstName + ' ' + response.lastName;
          this.buyerEmail = response.email;
          this.buyerTel = response.tel;
          this.getPurchase();
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('El token de sesión es nulo');
    }
  }

  isAValidAddress(): boolean{
    return this.isTheBuyerAddress === false
        || (
          this.purchase.deliveryPoint.id != 0
          || (
                this.purchase.deliveryPoint.location.id != 0
                && this.purchase.deliveryPoint.location.province.id != 0
                && this.purchase.deliveryPoint.postcode != 0
                && this.purchase.deliveryPoint.street != ''
                && ((this.purchase.deliveryPoint.apartmentFlag === true && this.purchase.deliveryPoint.apartment != '')
                    || this.purchase.deliveryPoint.apartmentFlag === false)
              )
          )
  }

  createPurchase(){
    const dialogRef = this.dialog.open(ProgressSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });

    if(this.isAValidAddress() && this.purchase.paymentMethod.id != 0){

      switch (this.purchase.paymentMethod.name){
        case "Mercado Pago": {
          this.mercadoPagoService.createPayment(this.purchase); // obtener respuesta
          break;
        }
        case "Uala": {
          this.ualaBisService.createPayment(this.purchase); // obtener respuesta
          break;
        }
        default: {}
      }

      if(true){ // respuesta obtenida positiva
        this.purchaseService
        .create(this.purchase)
        .pipe(takeUntil(this.$_destroyed),
          map((response) => {
            return this.purchase = response;
          })
        )
        .subscribe( () => {

          const message = this.method.name == 'Efectivo' ? '¡La compra fue efectuada exitosamente!' : '¡El pago fue efectuado exitosamente!';
          Swal.fire('Exito', message,'success').then(result => {
            window.location.reload();
          });
          dialogRef.close();
        },
        () => {
          Swal.fire('Error', 'No se pudo concretar la compra', 'error');
          window.location.reload();
          dialogRef.close();
        });
      } else {
          Swal.fire('Error', 'No se pudo concretar la compra', 'error');
          window.location.reload();
          dialogRef.close();
      }
    }
  }

  deliverySelected = false;
  showAddress = false;
  loadAddressFromUser(){
    this.addressService.setAddress(this.purchase.buyer.address);
    this.purchase.deliveryPoint = this.purchase.buyer.address;
    this.isTheBuyerAddress = true;
    this.toggleHome = true;
    this.toggleDelivery = false;
    this.showAddress = true;
    this.deliverySelected = true;
  }

  clearAddress(){
    this.addressService.setAddress(this.addressService.emptyAddress());
    this.isTheBuyerAddress = false;
    this.toggleHome = false;
    this.toggleDelivery = true;
    this.showAddress = false;
    this.deliverySelected = true;
  }

  setFormInfoToAddressForm(addressForm: FormGroup): void {
    this.purchase.deliveryPoint.location.province.id = addressForm.get('province')?.value;
    this.purchase.deliveryPoint.location.id = addressForm.get('location')?.value;
    this.purchase.deliveryPoint.postcode = addressForm.get('postcode')?.value;
    this.purchase.deliveryPoint.street = addressForm.get('address')?.value;
    this.purchase.deliveryPoint.apartmentFlag = addressForm.get('isApartment')?.value;
    this.purchase.deliveryPoint.apartment = addressForm.get('apartment')?.value;
  }
}
