import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-missing-fields',
    templateUrl: './missing-required-fields.component.html',
    styleUrls: ['./missing-required-fields.component.css']
})
export class MissingRequiredFieldsComponent {

    missingFieldsFirstTab: String[] = [];
    missingFieldsSecondTab: String[] = [];
    missingFieldsThirdTab: String[] = [];
    justInvalidFields: Boolean = false;
    isEdit: Boolean = false;
    missingFieldsMessage: String = '';
    invalidMessage: String = '';
    editAndPasswordMissing: Boolean = false;
    isRegister: Boolean = false;
    firstTabLabel: String = '';
    secondTabLabel: String = '';
    thirdTabLabel: String = '';

    constructor(public dialogRef: MatDialogRef<MissingRequiredFieldsComponent>) { }

    onOkClick() {
        this.dialogRef.close();
    }

    ngOnInit() {
        let typeOfAction = '';
        if (this.isRegister) {
            this.firstTabLabel = 'Datos de la cuenta:';
            this.secondTabLabel = 'Datos personales:';
            this.thirdTabLabel = 'Datos de dirección:';
            typeOfAction = 'al registro';
        } else {
            this.firstTabLabel = 'Información de la publicación:';
            this.secondTabLabel = 'Imágenes:';
            this.thirdTabLabel = 'Ubicación:';
            typeOfAction = 'a la creación de la publicación';
        }

        if (this.isEdit) {
            this.missingFieldsMessage = 'Te falta completar los siguientes campos para poder guardar tus cambios:';
            this.invalidMessage = 'Ciertos campos ingresados contienen errores. Por favor revisá los mensajes indicados y corregí lo solicitado para poder guardar tus cambios.';
            this.editAndPasswordMissing = (this.missingFieldsFirstTab.length == 2 && this.missingFieldsFirstTab.includes('Contraseña') && this.missingFieldsFirstTab.includes('Repetí tu contraseña')) || (this.missingFieldsFirstTab.length == 1 && (this.missingFieldsFirstTab.includes('Contraseña') || this.missingFieldsFirstTab.includes('Repetí tu contraseña')));
            this.missingFieldsFirstTab = this.missingFieldsFirstTab.filter(field => field != 'Contraseña' && field != 'Repetí tu contraseña');
        } else {
            this.missingFieldsMessage = 'Te falta completar los siguientes campos para poder proceder ' + typeOfAction + ':';
            this.invalidMessage = 'Ciertos campos ingresados contienen errores. Por favor revisá los mensajes indicados y corregí lo solicitado para poder proceder ' + typeOfAction + '.';
        }
    }
}