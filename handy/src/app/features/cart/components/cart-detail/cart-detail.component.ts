import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CartService } from '../../services/cart-service/cart.service';
import { Cart } from 'src/app/core/models/cart';
import { Post } from 'src/app/core/models/post';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class DialogCartDetailComponent {

  amount: FormControl;
  dateTo: FormControl;
  private $_destroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DialogCartDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {amount: number, post: Post, cart: Cart},
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {
    this.amount = new FormControl(data.amount, [Validators.required, Validators.min(0), Validators.max(data.post.stock)]);
    this.dateTo = new FormControl(data.cart?.dateTo ? data.cart.dateTo : null);
  }

  user: User = this.userService.emptyUser();
  cart: Cart = this.cartService.emptyCart();
  cartID!: number;

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.cartID = params['id'];
      this.getCart();
    });
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  getUser(){
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

  getCart(){
    if(this.data.cart != null){
      this.cart = this.data.cart;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.amount.valid) {
      this.cart.amount = this.amount.value;
      if(this.optionChosen === "comprar"){
        this.cart.isLeasing = true;
      }
      this.cart.dateTo = this.dateTo.value;
      this.cart.post = this.data.post;
      this.cart.user = this.user;

      this.cartService
      .create(this.cart)
      .subscribe(() => {
        Swal.fire('Exito','¡El producto fue agregado al carrito!','success');
      },
      () => {
        Swal.fire('Error', 'Hubo un error', 'error');
      });
    }
    this.dialogRef.close();
  }

  openInformationModal: Boolean = false;
  handleInformationClick(): void{
    this.openInformationModal = !this.openInformationModal;
  }

  selectionWasDone: Boolean = false;
  optionChosen: String = '';
  optionSelected(type: String): void{
    this.selectionWasDone = true;
    this.optionChosen = type;
  }
  undoSelection(): void{
    this.selectionWasDone = false;
    this.optionChosen = '';
  }

  isAnInvalidadDate(){
    const cartDate = new Date(this.dateTo.value);
    const nowDate = new Date();
    return cartDate.getTime() <= nowDate.getTime() - 1;
  }

  disableButton(){
    return ((this.dateTo.value == null || this.isAnInvalidadDate()) && (this.optionChosen == 'alquilar' || this.optionChosen == '')) || (this.amount.value > this.data.post.stock) || (this.amount.value == null || this.amount.value <= 0);
  }

}
