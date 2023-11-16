import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if(value){
      return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    }
    return '';
  }
}