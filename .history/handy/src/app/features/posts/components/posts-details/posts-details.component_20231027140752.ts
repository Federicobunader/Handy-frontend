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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.css']
})
export class PostsDetailsComponent {

  private $_destroyed = new Subject();

  postForm = new FormGroup({
    title: new FormControl ('', [Validators.required, Validators.maxLength(100)]),
    productName: new FormControl ('', [Validators.required, Validators.maxLength(100)]),
    productDescription: new FormControl ('', [Validators.required]),
    productCategory: new FormControl (0, [Validators.required]),
    productBrand: new FormControl (0, [Validators.required]),
    productSubCategory: new FormControl (0, [Validators.required]),
    rentalPrice: new FormControl (0, [Validators.required,  Validators.min(0)]),
    salesPrice: new FormControl (0,[ Validators.min(0)]),
    depositPrice: new FormControl (0, [Validators.required,  Validators.min(0)]),
    stock: new FormControl (0, [Validators.required, Validators.min(0)]),
    isActive: new FormControl (true, [Validators.required]),
    isLeasing: new FormControl (false, [Validators.required]),
    addressForm : new FormGroup ({
      address: new FormControl ('', [Validators.required]),
      location: new FormControl (0, [Validators.required, Validators.min(1)]),
      province: new FormControl (0, [Validators.required, Validators.min(1)]),
      postcode: new FormControl (0, [Validators.required,  Validators.min(1)]),
      isApartment: new FormControl (false, [Validators.required]),
      apartment: new FormControl ('', [Validators.maxLength(100)]),
    }),
  });

  post : Post = this.postService.emptyPost();
  private postID! : number
  createOrUpdateLabel: string = "CREAR PUBLICACIÓN";

  categories: Category[] = [];
  brands: Brand [] = [];
  subcategories: SubCategory[] = [];
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
    private userService: UserService,
    private router: Router
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
    if(this.post.photos.length > 0)
    {
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
      }
    }
    else{
      Swal.fire('Error', 'La publicación debe tener al menos una foto', 'error');
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

  getPost(){
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
      this.setDataInfoToForm();
      this.addressService.setAddress(this.post.address);
      this.photoService.setPhotosINFO(this.post.photos);
      this.setButtonMessage();
      if(this.post.product.subCategory.category.id){
        this.getBrands(this.post.product.subCategory.category.id);
      }
    });
  }

  setButtonMessage(){
    if(this.post.id != undefined){
      this.createOrUpdateLabel = "GUARDAR CAMBIOS"
    }
    else{
      this.createOrUpdateLabel = "CREAR PUBLICACIÓN"
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
}
