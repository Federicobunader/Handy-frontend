import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from 'src/app/core/models/location';
import { Province } from 'src/app/core/models/province';
import { AddressService } from '../../services/address/address.service';
import { takeUntil, map, Subject } from 'rxjs';
import { Address } from 'src/app/core/models/address';
import { AddressMapper } from 'src/app/core/mappers/address-mapper';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() parentForm: FormGroup | undefined;
  @Output() transferAddressForm = new EventEmitter<FormGroup>();
  @Output() transferAddressFormValidatorCheck = new EventEmitter<boolean>();

  private $_destroyed = new Subject();

  addressForm = new FormGroup({
    address: new FormControl ('', [Validators.required, Validators.maxLength(100)]),
    location: new FormControl (0, [Validators.required, Validators.min(1)]),
    province: new FormControl (0, [Validators.required, Validators.min(1)]),
    postcode: new FormControl (0, [Validators.required,  Validators.min(1), Validators.max(99999)]),
    isApartment: new FormControl (false, [Validators.required]),
    apartment: new FormControl ('', [Validators.maxLength(10)]),
  });

  provinces: Province[] = [];
  locations: Location[] = [];



  constructor(
    private addressService: AddressService,
  ) {
    this.addressForm.valueChanges.subscribe(value => {
      this.transferAddressForm.emit(this.addressForm);
      if(this.addressForm.valid){
        this.transferAddressFormValidatorCheck.emit(true);
      }
      else{
        this.transferAddressFormValidatorCheck.emit(false);
      }
    })
  }

  address: Address = this.addressService.emptyAddress();

  getProvinces(){
    this.addressService
    .getProvinces()
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Province[]) => (
          this.provinces = response))
      )
    .subscribe();
  }

  getLocations(provinceID: number){
    this.addressService
    .getLocations(provinceID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Location[]) => (this.locations = response))
      )
    .subscribe();
  }

  setInitialData(){

    this.addressService.getAddress().subscribe(
      (      address: Address) => {
        if(address.location.province.id != 0){
          this.getLocations(address.location.province.id);
        }

        this.addressForm.get('location')?.setValue(address.location.id)
        this.addressForm.get('province')?.setValue(address.location.province.id);
        this.addressForm.get('postcode')?.setValue(address.postcode);
        this.addressForm.get('address')?.setValue(address.street);
        this.addressForm.get('isApartment')?.setValue(address.apartmentFlag);
        this.addressForm.get('apartment')?.setValue(address.apartment);
      }
    );
  }

  ngOnInit(): void {
    this.getProvinces();
    this.setInitialData();
    if(this.parentForm){
      this.parentForm.addControl('addressForm', this.addressForm);
    }
  }

}

