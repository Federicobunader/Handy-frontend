import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { CartService } from 'src/app/features/cart/services/cart-service/cart.service';
import { Cart } from 'src/app/core/models/cart';
import Swal from 'sweetalert2';
import { TotalToPayPerAuthorService } from 'src/app/features/cart/services/total-to-pay-per-author-service/totalToPayPerAuthor.service';
import { TotalToPayPerAuthor } from 'src/app/core/models/total-to-pay-per-author';

@Component({
    selector: 'app-purchase-returned',
    templateUrl: './purchase-returned.component.html',
    styleUrls: ['./purchase-returned.component.css']
  })

export class PurchaseReturnedComponent {

  constructor(
    public dialogRef: MatDialogRef<PurchaseReturnedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cart: Cart, totalToPayPerAuthor: TotalToPayPerAuthor},
    private cartService: CartService,
    private totalToPyPerAuthorService: TotalToPayPerAuthorService,
    )
  {}
  @Output() event = new EventEmitter<string>();
  private $_destroyed = new Subject();

  onCancelClick(): void {
    this.dialogRef.close();
    this.event.emit('Cancel');
  }

  onSaveClick(): void {
    this.data.cart.returnedFlag = true;
    this.cartService
        .updateCart(this.data.cart)
        .pipe(takeUntil(this.$_destroyed),
          map((response) => {
            return this.data.cart = response;
          })
        )
        .subscribe( () => {
          Swal.fire('Exito', 'Información guardada', 'success');
          this.dialogRef.close();
        },
        (error) => {
          Swal.fire('Error', 'Hubo un error', 'error');
          this.event.emit('Cancel');
        });
  }


}
