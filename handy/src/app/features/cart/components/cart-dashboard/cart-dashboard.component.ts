import { Component, Input } from '@angular/core';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/core/models/user';
import { Cart } from 'src/app/core/models/cart';
import { Subject, map, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { TotalToPayPerAuthor } from 'src/app/core/models/total-to-pay-per-author';
import { TotalToPayPerCart } from 'src/app/core/models/total-to-pay-per-cart';
import { MatDialog } from '@angular/material/dialog';
import { DialogCartDetailComponent } from '../cart-detail/cart-detail.component';
import { TotalToPayPerCartService } from '../../services/total-to-pay-per-cart-service/totalToPayPerCart.service';
import { TotalToPayPerAuthorService } from '../../services/total-to-pay-per-author-service/totalToPayPerAuthor.service';
import { CartService } from '../../services/cart-service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-dashboard',
  templateUrl: './cart-dashboard.component.html',
  styleUrls: ['./cart-dashboard.component.css']
})
export class CartDashboardComponent {

  @Input() showBuyButton = true;
  @Input() isPurchased = false;
  @Input() isPurchasedSection : Boolean = false;
  @Input() expanded : Boolean = true;
  @Input() authorID = -1;

  private $_destroyed = new Subject();

  constructor(
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private totalToPayPerCartService: TotalToPayPerCartService,
    private totalToPayPerAuthorService: TotalToPayPerAuthorService,
    private cartService: CartService,
    private router: Router,
    public dialog: MatDialog,
  ) {}
  user: User = this.userService.emptyUser();
  totalsToPayPerAuthor: TotalToPayPerAuthor [] = [];
  totalsToPayPerCart: TotalToPayPerCart [] = [];

  ngOnInit(): void {
    this.getUser();
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
          this.getTotalToPayByAuthors();
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('El token de sesión es nulo');
      this.router.navigateByUrl('/login');
    }
  }

  getTotalToPayByAuthors(){
    if(this.authorID === -1){
        this.getTotalToPay();
    }else{
        this.getTotalToPayPerAuthorByID();
    }

  }

  pay(totalToPayPerAuthorID: number){
    this.router.navigate(['purchase',totalToPayPerAuthorID]);
  }

  viewPost(post: Post){
    this.router.navigate(['posts/view', post.id]);
  }

  editCart(cart: Cart){
    const dialogRef = this.dialog.open(DialogCartDetailComponent, {
      width: '600px',
      data: {amount: cart.amount, post: cart.post, cart: cart},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // Aquí puedes usar el valor ingresado por el usuario (result)
      }
    });
  }

  deleteCart(cart: Cart){
    Swal.fire({
      title: "¿Estas seguro de que querés eliminar " + cart.post.title + " del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
   })
    .then((result) => {
      if (result.isConfirmed) {
        this.cartService
        .deleteCart(cart.id)
        .pipe(
          takeUntil(this.$_destroyed),
        )
        .subscribe(() => {
          this.viewTotalsToPayPerCart(cart.id);
          this.getTotalToPay();
        });
      }
    });
  }

  viewTotalsToPayPerCart(totalToPayPerAuthorID: number){
    this.totalToPayPerCartService
    .getTotalsToPayPerCart(totalToPayPerAuthorID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: TotalToPayPerCart[]) => (
          this.totalsToPayPerCart = response))
      )
    .subscribe(() => {
      this.totalsToPayPerCart.forEach(total => {
        total.itemCartTotalToPay = total.itemCartTotalToPay.toLocaleString('es-CO');
        total.cart.post.product.rentalPrice = total.cart.post.product.rentalPrice.toLocaleString('es-CO');
        total.cart.post.product.salesPrice = total.cart.post.product.salesPrice.toLocaleString('es-CO');
        total.cart.post.product.depositPrice = total.cart.post.product.depositPrice.toLocaleString('es-CO');
        total.totalToPayPerAuthor.totalToPay = total.totalToPayPerAuthor.totalToPay.toLocaleString('es-CO');
      });
    });
  }

  getTotalToPayPerAuthorByID(){
    this.totalToPayPerAuthorService
    .getTotalToPayByAuthorID(this.authorID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: TotalToPayPerAuthor) => (
          this.totalsToPayPerAuthor.push(response)))
      )
    .subscribe( () => {
      this.totalsToPayPerAuthor.forEach( total => total.totalToPay = total.totalToPay.toLocaleString('es-CO'));
    });
  }

  getTotalToPay(){
    this.totalToPayPerAuthorService
    .getTotalToPay(this.user.id)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: TotalToPayPerAuthor[]) => (
          this.totalsToPayPerAuthor = response))
      )
    .subscribe(() => {
      this.totalsToPayPerAuthor.forEach( total => total.totalToPay = total.totalToPay.toLocaleString('es-CO'));
    });
  }

  sendTo(post: Post){
      this.router.navigate(['posts/view', post.id]);
  }
}
