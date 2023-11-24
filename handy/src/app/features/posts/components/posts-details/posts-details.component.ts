import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { Post } from 'src/app/core/models/post';
import { PostService } from '../../services/posts-service/posts.service';
import { CategoriesService } from '../../services/categories-service/categories.service';
import { Photo } from 'src/app/core/models/photo';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { PhotoService } from 'src/app/shared/services/photo/photo.service';
import { SubCategory } from 'src/app/core/models/sub-category';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Router } from '@angular/router';
import { BrandsService } from '../../services/brands-service/brands.service';
import { Brand } from 'src/app/core/models/brand';
import { MatDialog } from '@angular/material/dialog';
import { MissingRequiredFieldsComponent } from 'src/app/shared/components/missing-required-fields/missing-required-fields.component';
import Swal from 'sweetalert2';
import { PaymentMethodService } from 'src/app/shared/services/payment-method/payment-method.service';
import { PaymentMethod } from 'src/app/core/models/paymentMethod';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.css']
})
export class PostsDetailsComponent {

  private $_destroyed = new Subject();
  selectedPaymentMethod: PaymentMethod[] = [];

  postForm = new FormGroup({
    title: new FormControl ('', [Validators.required, Validators.maxLength(100)]),
    productName: new FormControl ('', [Validators.required, Validators.maxLength(100)]),
    productDescription: new FormControl ('', [Validators.required, Validators.maxLength(500)]),
    productCategory: new FormControl (0, [Validators.required]),
    productBrand: new FormControl (0, [Validators.required]),
    productSubCategory: new FormControl (0, [Validators.required]),
    rentalPrice: new FormControl (0, [Validators.required,  Validators.min(0)]),
    salesPrice: new FormControl (0,[ Validators.min(0)]),
    depositPrice: new FormControl (0, [Validators.required,  Validators.min(0)]),
    stock: new FormControl (0, [Validators.required, Validators.min(0)]),
    isActive: new FormControl (true, [Validators.required]),
    isLeasing: new FormControl (false, [Validators.required]),
    postPaymentMethods: new FormControl(this.selectedPaymentMethod,[Validators.required]),
    addressForm : new FormGroup ({
      address: new FormControl ('', [Validators.required]),
      location: new FormControl (0, [Validators.required, Validators.min(1)]),
      province: new FormControl (0, [Validators.required, Validators.min(1)]),
      postcode: new FormControl (0, [Validators.required,  Validators.min(1)]),
      isApartment: new FormControl (false, [Validators.required]),
      apartment: new FormControl ('', [Validators.maxLength(10)]),
    }),
  });

  post : Post = this.postService.emptyPost();
  private postID! : number
  createOrUpdateTitle : string = "Creá tu publicación";
  createOrUpdateLabel : string = "CREAR PUBLICACIÓN";
  activeCheckboxLabel : string = "Activar publicación";

  categories: Category[] = [];
  brands: Brand [] = [];
  subcategories: SubCategory[] = [];
  paymentMethods: PaymentMethod[] = [];
  photos: File [] = [];
  isAValidPostForm: boolean = false;
  private formValueChangesSubscription: Subscription = new Subscription;
  isAddressFormValid: boolean = false;

  constructor(
    private postService: PostService,
    private categoriesService: CategoriesService,
    private brandService: BrandsService,
    private addressService: AddressService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private sessiontokenService: SessiontokenService,
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  getCategories(){
    this.categoriesService
    .getCategories()
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Category[]) => (
          this.categories = response))
      )
    .subscribe();
  }

  getSubCategories(categoryID: number){
    this.getBrands(categoryID);

    this.categoriesService
    .getSubCategories(categoryID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: SubCategory[]) => (this.subcategories = response))
      )
    .subscribe();
  }

  getBrands(categoryID: number){

    this.brandService
    .getBrands(categoryID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Brand[]) => (this.brands = response))
      )
    .subscribe();
  }

  setDataInfoToForm(): void{

    this.postForm.get('title')?.setValue(this.post.title);
    this.postForm.get('productName')?.setValue(this.post.product.name);
    this.postForm.get('productDescription')?.setValue(this.post.product.description);
    this.postForm.get('productBrand')?.setValue(this.post.product.brand.id);
    this.postForm.get('productSubCategory')?.setValue(this.post.product.subCategory.id);
    this.postForm.get('productCategory')?.setValue(this.post.product.subCategory.category.id);
    this.postForm.get('rentalPrice')?.setValue(this.post.product.rentalPrice);
    this.postForm.get('depositPrice')?.setValue(this.post.product.depositPrice);
    this.postForm.get('salesPrice')?.setValue(this.post.product.salesPrice ? this.post.product.salesPrice : 0);
    this.postForm.get('stock')?.setValue(this.post.stock);
    this.postForm.get('isActive')?.setValue(this.post.isActive);
    this.postForm.get('isLeasing')?.setValue(this.post.isLeasing);
    this.postForm.get('postPaymentMethods')?.setValue(this.post.paymentMethods);

    if(this.post.product.subCategory.category.id != 0){
      this.getSubCategories(this.post.product.subCategory.category.id);
    }
  }

  setFormInfoToPostForm(): void {

    this.post.title = this.postForm.get('title')?.value ?? '';
    this.post.product.name = this.postForm.get('productName')?.value ?? '';
    this.post.product.description = this.postForm.get('productDescription')?.value ?? '';
    this.post.product.brand.id = this.postForm.get('productBrand')?.value ?? 0;
    this.post.product.subCategory.id = this.postForm.get('productSubCategory')?.value ?? 0;
    this.post.product.subCategory.category.id = this.postForm.get('productCategory')?.value ?? 0;
    this.post.product.rentalPrice = this.postForm.get('rentalPrice')?.value ?? 0;
    this.post.product.salesPrice = this.postForm.get('salesPrice')?.value ?? 0;
    this.post.product.depositPrice = this.postForm.get('depositPrice')?.value ?? 0;
    this.post.stock = this.postForm.get('stock')?.value ?? 0;
    this.post.isActive = this.postForm.get('isActive')?.value ?? true;
    this.post.isLeasing = this.postForm.get('isLeasing')?.value ?? false;
    this.post.paymentMethods = this.postForm.get('postPaymentMethods')?.value ?? [];
  }

  setFormInfoToAddressForm(addressForm: FormGroup): void {

    this.postForm.get('addressForm')?.get('province')?.setValue(addressForm.get('province')?.value);
    this.postForm.get('addressForm')?.get('location')?.setValue(addressForm.get('location')?.value);
    this.postForm.get('addressForm')?.get('postcode')?.setValue(addressForm.get('postcode')?.value);
    this.postForm.get('addressForm')?.get('address')?.setValue(addressForm.get('address')?.value);
    this.postForm.get('addressForm')?.get('isApartment')?.setValue(addressForm.get('isApartment')?.value);
    this.postForm.get('addressForm')?.get('apartment')?.setValue(addressForm.get('apartment')?.value);

    this.post.address.location.province.id = addressForm.get('province')?.value ?? 0;
    this.post.address.location.id = addressForm.get('location')?.value ?? 0;
    this.post.address.location.province.country.id = addressForm.get('country')?.value ?? 0;
    this.post.address.postcode = addressForm.get('postcode')?.value ?? 0;
    this.post.address.street = addressForm.get('address')?.value ?? '';
    this.post.address.apartmentFlag = addressForm.get('isApartment')?.value ?? false;
    this.post.address.apartment = addressForm.get('apartment')?.value ?? '';

  }

  setPhotoInfoToPost(photos: Photo []): void {
    this.post.photos = photos ? photos : [];
  }

  setPhotoToPost(photos: File []): void {
    this.photos = photos ? photos : [];
  }

  saveOrUpdate(){
    let invalid = false;
    if(this.post.photos.length > 0){
      if (this.postForm.valid && this.isAddressFormValid) {
        this.setFormInfoToPostForm();

        this.postService
          .create(this.post, this.photos)
          .pipe(takeUntil(this.$_destroyed),
            map((response) => {
              return this.post = response;
            })
          )
          .subscribe(
            () => {
              // Operación exitosa: mostrar notificación de éxito
              if(this.router.url.startsWith('/posts/edit')){
                Swal.fire('Exito','¡Los cambios fueron aplicados exitosamente!','success');
              } else {
                Swal.fire('Exito','¡Publicacion creada exitosamente!','success');
              }
              this.router.navigateByUrl('/posts/view/' + this.post.id);
            },
            (error) => {
              // Error en la operación: mostrar notificación de error con el mensaje del error
              Swal.fire('Error', 'No se pudo crear la publicacion', 'error');
            }
          );
      } else {
        invalid = true;
      }
    } else {
      invalid = true;
    }

    if(invalid){
      this.checkMissingRequiredField();
      const dialogRef = this.dialog.open(MissingRequiredFieldsComponent, {
        width: '600px',
      });
      dialogRef.componentInstance.missingFieldsFirstTab = this.missingRequiredFieldsFirstTab;
      dialogRef.componentInstance.missingFieldsSecondTab = this.missingRequiredFieldsSecondTab;
      dialogRef.componentInstance.missingFieldsThirdTab = this.missingRequiredFieldsThirdTab;
      dialogRef.componentInstance.justInvalidFields = this.missingRequiredFieldsFirstTab.length == 0 && this.missingRequiredFieldsSecondTab.length == 0 && this.missingRequiredFieldsThirdTab.length == 0;
      dialogRef.componentInstance.isEdit = this.post.id != undefined && this.post.id != 0;
      dialogRef.componentInstance.isRegister = false;
    }
  }

  missingRequiredFieldsFirstTab: String[] = [];
  missingRequiredFieldsSecondTab: String[] = [];
  missingRequiredFieldsThirdTab: String[] = [];

  checkMissingRequiredField() {

    this.missingRequiredFieldsFirstTab = [];
    this.missingRequiredFieldsSecondTab = [];
    this.missingRequiredFieldsThirdTab = [];

    if (this.postForm.value.title == "") {
      this.missingRequiredFieldsFirstTab.push('Título de la publicación');
    }
    if (this.postForm.value.productName == "") {
      this.missingRequiredFieldsFirstTab.push('Nombre del producto');
    }
    if (this.postForm.value.stock == 0) {
      this.missingRequiredFieldsFirstTab.push('Stock');
    }
    if (this.postForm.value.rentalPrice == 0) {
      this.missingRequiredFieldsFirstTab.push('Precio de alquiler por día');
    }
    if (this.postForm.value.productCategory == 0) {
      this.missingRequiredFieldsFirstTab.push('Categoría');
    }
    if (this.postForm.value.productSubCategory == 0) {
      this.missingRequiredFieldsFirstTab.push('Subcategoría');
    }
    if (this.postForm.value.productBrand == 0) {
      this.missingRequiredFieldsFirstTab.push('Marca');
    }
    if (this.postForm.value.productDescription == "") {
      this.missingRequiredFieldsFirstTab.push('Descripción del producto');
    }
    if(this.postForm.value.postPaymentMethods?.length == 0){
      this.missingRequiredFieldsFirstTab.push('Al menos una forma de pago');
    }
    if (this.postForm.value.isLeasing) {
      if (this.postForm.value.salesPrice == 0) {
        this.missingRequiredFieldsFirstTab.push('Precio de venta');
      }
    }

    if (this.post.photos.length == 0) {
      this.missingRequiredFieldsSecondTab.push('Al menos una foto');
    }

    if (this.postForm.value.addressForm?.province == 0) {
      this.missingRequiredFieldsThirdTab.push('Provincia');
    }
    if (this.postForm.value.addressForm?.location == 0) {
      this.missingRequiredFieldsThirdTab.push('Localidad');
    }
    if (this.postForm.value.addressForm?.address == "") {
      this.missingRequiredFieldsThirdTab.push('Calle y número');
    }
    if (this.postForm.value.addressForm?.postcode == 0) {
      this.missingRequiredFieldsThirdTab.push('Código postal');
    }
    if (this.postForm.value.addressForm?.isApartment) {
      if(this.postForm.value.addressForm?.apartment == ""){
        this.missingRequiredFieldsThirdTab.push('Piso y departamento');
      }
    }
  }

  getAuthor(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.post.author = response;
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

  getPaymentMethods(){
    this.paymentMethodService
    .getPaymentMethods()
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: PaymentMethod[]) => (
          this.paymentMethods = response))
      )
    .subscribe();
  }

  currentPaymentMethods = '';
  hasPaymentMethods = false;
  getPost(){
    if(this.postID != undefined){
      this.postService
      .getPostByID(this.postID)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: Post) => {
            this.addressService.setAddress(response.address);
            this.post = response;
          }
        )
      )
      .subscribe(() => {
        this.hasPaymentMethods = this.post.paymentMethods.length > 0;
        this.currentPaymentMethods = this.post.paymentMethods.map( paymentMethod => paymentMethod.name ).join(', ');
        this.setDataInfoToForm();
        this.addressService.setAddress(this.post.address);
        this.photoService.setPhotosINFO(this.post.photos);
        this.setButtonMessage();
        if(this.post.product.subCategory.category.id){
          this.getBrands(this.post.product.subCategory.category.id);
        }
      });
    }
  }

  showPaymentMethodSelector(){
    this.hasPaymentMethods = false;
  }

  setButtonMessage(){
    if(this.post.id != undefined){
      this.createOrUpdateLabel = "GUARDAR CAMBIOS";
      this.activeCheckboxLabel = "Publicación activa";
      this.createOrUpdateTitle = "Editá tu publicación";
    }
    else{
      this.createOrUpdateLabel = "CREAR PUBLICACIÓN";
      this.activeCheckboxLabel = "Una vez creada la publicación, ¿querés que se active?";
      this.createOrUpdateTitle = "Creá tu publicación";
    }
  }

  setAddressFormValidator(isAValidForm: boolean): void{
    this.isAddressFormValid = isAValidForm;
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();

    this.formValueChangesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postID = params['id'];
      this.photoService.setPhotosINFO([]);
      this.addressService.setAddress(this.addressService.emptyAddress());
      this.getPost();
    });
    this.getAuthor();
    this.getCategories();
    this.getPaymentMethods();

    this.formValueChangesSubscription = this.postForm.valueChanges.subscribe(() => {
      if(this.postForm.valid){
        this.isAValidPostForm = true;
      }
      else{
        this.isAValidPostForm = false;
      }
  });
  }

  getPhotoDisplayMessage(){
    return 'Arrastrá y soltá las fotos acá o'
  }

  getPhotoLimitMessage(){
    return 'Se alcanzó el límite máximo de fotos';
  }

  openInformationModal: Boolean = false;
  handleInformationClick(): void{
    this.openInformationModal = !this.openInformationModal;
  }

  openActiveInformationModal: Boolean = false;
  handleActiveInformationClick(): void{
    this.openActiveInformationModal = !this.openActiveInformationModal;
  }
}
