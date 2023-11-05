import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-missing-fields',
  templateUrl: './register-missing-fields.component.html',
  styleUrls: ['./register-missing-fields.component.css']
})
export class RegisterMissingFieldsComponent {
    
    missingFields: String [] = [];
    justInvalidFields: Boolean = false;
    isEdit: Boolean = false;
    missingFieldsMessage: String = '';
    invalidMessage: String = '';
    editAndPasswordMissing: Boolean = false;

    constructor(public dialogRef: MatDialogRef<RegisterMissingFieldsComponent>){}

    onOkClick(){    
      this.dialogRef.close();
    }

    ngOnInit(){
      if(this.isEdit){
        this.missingFieldsMessage = 'Te falta completar los siguientes campos para poder guardar tus cambios:';
        this.invalidMessage = 'Ciertos campos ingresados contienen errores. Por favor revisá los mensajes indicados y corregí lo solicitado para poder guardar tus cambios.';
        this.editAndPasswordMissing = this.missingFields.length == 2 && this.missingFields.includes('Contraseña') && this.missingFields.includes('Contraseña verificada');
        this.missingFields = this.missingFields.filter( field => field != 'Contraseña' && field != 'Contraseña verificada');
      } else {        
        this.missingFieldsMessage = 'Te falta completar los siguientes campos para poder proceder al registro:';
        this.invalidMessage = 'Ciertos campos ingresados contienen errores. Por favor revisá los mensajes indicados y corregí lo solicitado para poder finalizar con el regsitro.';
      }
    }
}