import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-missing-fields',
  templateUrl: './missing-required-fields.component.html',
  styleUrls: ['./missing-required-fields.component.css']
})
export class MissingRequiredFieldsComponent {
    
    missingFieldsFirstTab: String [] = [];
    missingFieldsSecondTab: String [] = [];
    missingFieldsThirdTab: String [] = [];
    justInvalidFields: Boolean = false;
    isEdit: Boolean = false;
    missingFieldsMessage: String = '';
    invalidMessage: String = '';
    editAndPasswordMissing: Boolean = false;
    isRegister: Boolean = false;

    constructor(public dialogRef: MatDialogRef<MissingRequiredFieldsComponent>){}

    onOkClick(){    
      this.dialogRef.close();
    }

    ngOnInit(){
      if(this.isEdit){
        this.missingFieldsMessage = 'Te falta completar los siguientes campos para poder guardar tus cambios:';
        this.invalidMessage = 'Ciertos campos ingresados contienen errores. Por favor revisá los mensajes indicados y corregí lo solicitado para poder guardar tus cambios.';
        this.editAndPasswordMissing = this.missingFieldsFirstTab.length == 2 && this.missingFieldsFirstTab.includes('Contraseña') && this.missingFieldsFirstTab.includes('Contraseña verificada');
        this.missingFieldsFirstTab = this.missingFieldsFirstTab.filter( field => field != 'Contraseña' && field != 'Contraseña verificada');
      } else {        
        this.missingFieldsMessage = 'Te falta completar los siguientes campos para poder proceder al registro:';
        this.invalidMessage = 'Ciertos campos ingresados contienen errores. Por favor revisá los mensajes indicados y corregí lo solicitado para poder finalizar con el regsitro.';
      }
    }
}