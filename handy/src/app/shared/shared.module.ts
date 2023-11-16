import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { AddressComponent } from './components/address/address.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './components/photo/photo/photo.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NumberFormatPipe } from './components/number-format/number-format.pipe';
import { DateFormatPipe } from './components/date-format/date-format.pipe';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatOptionModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule
  ],
  declarations: [
    AddressComponent,
    PhotoComponent,
    NavBarComponent,
    ProgressSpinnerComponent,
    NumberFormatPipe,
    DateFormatPipe
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatOptionModule,
    MatSidenavModule,
    MatCheckboxModule,
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
    NumberFormatPipe,
    DateFormatPipe,
    AddressComponent,
    PhotoComponent,
    NavBarComponent,
    ProgressSpinnerComponent
  ]
})
export class SharedModule {}
