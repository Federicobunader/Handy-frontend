import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/core/models/user';
import { Subject, map, takeUntil } from 'rxjs';
import { Purchase } from 'src/app/core/models/purchase';
import { Post } from 'src/app/core/models/post';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseService } from '../../services/purchase.service';
import { TotalToPayPerCartService } from 'src/app/features/cart/services/total-to-pay-per-cart-service/totalToPayPerCart.service';
import { TotalToPayPerCart } from 'src/app/core/models/total-to-pay-per-cart';
import { DialogRatingDetailsComponent } from 'src/app/shared/components/rating-details/rating-details.component';
import { PurchaseReturnedComponent } from 'src/app/features/purchase/components/purchase-returned/purchase-returned.component';
import { TotalToPayPerAuthor } from 'src/app/core/models/total-to-pay-per-author';
import { Cart } from 'src/app/core/models/cart';

@Component({
  selector: 'app-purchase-dashboard',
  templateUrl: './purchase-dashboard.component.html',
  styleUrls: ['./purchase-dashboard.component.css']
})
export class PurchaseDashboardComponent {

  @Input() isBuyer : boolean = true;
  purchases: Purchase [] = [];
  private $_destroyed = new Subject();
  today = new Date();

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private totalToPayPerCartService: TotalToPayPerCartService,
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getFrom();
  }

  from: User = this.userService.emptyUser();
  totalsToPayPerCart: TotalToPayPerCart [] = [];

  getFrom(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.from = response;
          this.getPurchasesFor();
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

  showEmptyMessage = false;
  getPurchasesFor() {
    if(this.isBuyer){
      this.purchaseService
      .getPurchasesForBuyer(this.from.id)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: Purchase[]) => (
            this.purchases = response))
        )
      .subscribe( () => {
        this.showEmptyMessage = this.purchases.length == 0;
      });
    }
    else{
      this.purchaseService
      .getPurchasesForSeller(this.from.id)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: Purchase[]) => (
            this.purchases = response))
        )
      .subscribe( () => {
        this.showEmptyMessage = this.purchases.length == 0;
      });
    }

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
      console.log('totalsToPayPerCart',this.totalsToPayPerCart)
    });
  }

  sendToPurchase(purchase: Purchase){
    this.totalToPayPerCartService
    .getTotalsToPayPerCart(purchase.totalToPayPerAuthor.id)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: TotalToPayPerCart[]) => (
          this.totalsToPayPerCart = response))
      )
    .subscribe(() => {
      let availablePaymentMethods = this.getAvailablePaymentMethods(this.totalsToPayPerCart);
      this.router.navigate(['purchase/' + purchase.totalToPayPerAuthor.id], { queryParams: { paymentMethods: availablePaymentMethods, buyerId: purchase.totalToPayPerAuthor.from.id, buyerName: purchase.totalToPayPerAuthor.from.firstName + ' ' + purchase.totalToPayPerAuthor.from.lastName, buyerEmail: purchase.totalToPayPerAuthor.from.email, buyerPhone: purchase.totalToPayPerAuthor.from.tel }});
    });
  }


  getAvailablePaymentMethods(item: TotalToPayPerCart []){
    let paymentMethod1 = 0;
    let paymentMethod2 = 0;
    let paymentMethod3 = 0;
    let totalCarts = item.length;

    item.forEach( total => {
      total.totalToPayPerAuthor.author.paymentMethods.forEach( paymentMethod => {
        if(paymentMethod.name == 'Efectivo'){
          paymentMethod1++;
        }
        if(paymentMethod.name == 'Mercado Pago'){
          paymentMethod2++;
        }
        if(paymentMethod.name == 'Uala'){
          paymentMethod3++;
        }
      })
    });

    let availablePaymentMethods = '';
    if(paymentMethod1 == totalCarts){
      availablePaymentMethods += 1;
    }
    if(paymentMethod2 == totalCarts){
      availablePaymentMethods += 2;
    }
    if(paymentMethod3 == totalCarts){
      availablePaymentMethods += 3;
    }

    return availablePaymentMethods;
  }

  sendToPost(postId: number){
    this.router.navigate(['posts/view', postId]);
  }

  createPostRating(cart: Cart): void {
    const dialogRef = this.dialog.open(DialogRatingDetailsComponent, {
      width: '600px',
      data: {post: cart.post, author: this.from, userRatedUsername: null, isUserRating: false, cart: cart},
    });
    dialogRef.componentInstance.postName = cart.post.title;
    dialogRef.componentInstance.wasSaved = false;
    dialogRef.afterClosed().subscribe( result => {
      this.totalsToPayPerCart.forEach( total => {
        if(total.cart.id == cart.id){
          total.cart.userAlreadyRatedPost = dialogRef.componentInstance.wasSaved;
        }
      })
    });
  }

  createUserRating(cart: Cart): void{
    const dialogRef = this.dialog.open(DialogRatingDetailsComponent, {
      width: '600px',
      data: {post: null, author: this.from, userRated: cart.post.author, isUserRating: true, cart: cart},
    });
  }

  setProductAsReturned(cart : Cart, totalToPayPerAuthor: TotalToPayPerAuthor){
    const dialogRef = this.dialog.open(PurchaseReturnedComponent, {
      width: '600px',
      data: {cart, totalToPayPerAuthor},
    });

  }
}
