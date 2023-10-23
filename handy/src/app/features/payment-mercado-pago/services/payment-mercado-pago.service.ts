import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mercadoPagoURL } from 'src/app/core/constants/constants';
import { PurchaseMapper } from 'src/app/core/mappers/purchase-mapper';
import { Purchase } from 'src/app/core/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PaymentMercadoPagoService {

  constructor(
    private http: HttpClient,
    private purchaseMapper: PurchaseMapper,
    ) {
    this.purchaseMapper = new PurchaseMapper();
   }

  createPayment(purchase: Purchase){

    return this.http
    .post<any>(
      mercadoPagoURL,
      this.purchaseMapper.purchaseToDto(purchase),
    )
    .subscribe({
      next: (response) => {
        // Redirecciona al flujo de pago de Mercado Pago
        window.open(response.url, '_blank');
      },
      error: (error) => {
        console.error('Error al crear el pago', error);
        console.error('Respuesta:', error.error);
        console.error('Código de estado:', error.status);
        console.error('Texto del estado:', error.statusText);
      }
    });
  }
}
