import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { TotalToPayPerAuthor } from 'src/app/core/models/total-to-pay-per-author';
import { TotalToPayPerAuthorService } from 'src/app/features/cart/services/total-to-pay-per-author-service/totalToPayPerAuthor.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-purchase-returned',
    templateUrl: './purchase-returned.component.html',
    styleUrls: ['./purchase-returned.component.css']
  })

export class PurchaseReturnedComponent {

  constructor(
    public dialogRef: MatDialogRef<PurchaseReturnedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {totalToPayPerAuthor: TotalToPayPerAuthor},
    private totalToPayPerAuthorService: TotalToPayPerAuthorService,
    )
  {}
  @Output() event = new EventEmitter<string>();
  private $_destroyed = new Subject();

  onCancelClick(): void {
    this.dialogRef.close();
    this.event.emit('Cancel');
  }

  onSaveClick(): void {
    this.data.totalToPayPerAuthor.returnedFlag = true;
    this.data.totalToPayPerAuthor.totalToPay = parseFloat(this.data.totalToPayPerAuthor.totalToPay);
    this.totalToPayPerAuthorService
        .create(this.data.totalToPayPerAuthor)
        .pipe(takeUntil(this.$_destroyed),
          map((response) => {
            return this.data.totalToPayPerAuthor = response;
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
