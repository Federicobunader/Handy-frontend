import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { Post } from 'src/app/core/models/post';
import { PostService } from '../../services/posts-service/posts.service';
import { CategoriesService } from '../../services/categories-service/categories.service';
import { Province } from 'src/app/core/models/province';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { Location } from 'src/app/core/models/location';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/sub-category';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderByTypesService } from '../../services/order-by-types-service/order-by-types.service';
import { OrderByType } from 'src/app/core/models/orderByType';
import { BrandsService } from '../../services/brands-service/brands.service';
import { Brand } from 'src/app/core/models/brand';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css']
})
export class PostsDashboardComponent implements OnInit {

  @Input() action = "";
  @Input() emptyMessage : String = "No se encontraron resultados para tu búsqueda";
  @Input() toolsSearch : Boolean = true;

  posts : Post [] = [];
  postsToShow : Post [] = [];

  orderByOptions: OrderByType[] = [];
  filterOptions: String[] = ['Categoria', 'Ubicación'];

  selectedLocationIDs : number[] = [];
  allLocationIDsFromAProvince: number[] = [];
  selectedProvinceID : number | undefined;
  selectedCategoryID! : number;
  selectedSubCategoryIDs : number[] = [];
  selectedBrandsIDs : number[] = [];
  allBrandsIDsFromACategory: number[] = [];
  allSubCategoriesIDsFromACategory: number[] = [];
  selectedTitle: String = "";
  allSelected = false;
  activeFlag: boolean = true;
  selectedLeasingFilterFlag: boolean | null = null;

  categories: Category[] = [];
  subcategories: SubCategory[] = [];

  provinces: Province[] = [];
  locations: Location[] = [];
  brands: Brand[] = [];

  private $_destroyed = new Subject();

  constructor(
    private categoryService: CategoriesService,
    private postService: PostService,
    private addressService: AddressService,
    private brandService: BrandsService,
    private orderByTypeService: OrderByTypesService,
    private router: Router,
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    public dialog: MatDialog,
  ) {
  }

  user: User = this.userService.emptyUser();
  showEmptyMessage: Boolean = false;

  ngOnInit(): void {
    this.dialog.open(ProgressSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.getCategories();
    this.getProvinces();
    this.getUser();
    this.getOrderByTypes();
  }

  getPosts(){
    switch(this.action){
      case "viewMyPost":
        this.getPostForAuthor()
        break;
      default:
        this.getDefaultPostsToShow();
    }
  }

  getUser(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.user = response;
          this.getPosts();
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

  getCategories(){
    this.categoryService
    .getCategories()
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Category[]) => (
          this.categories = response))
      )
    .subscribe();
  }

  getSubCategories(event: any){
    this.selectedCategoryID = event == '--Seleccionar--' ? 0 : event;
    if(this.selectedCategoryID != 0){
      this.applyFilters();
      this.getSubCategoriesIDs();
      this.getbrands();
      this.categoryService
      .getSubCategories(this.selectedCategoryID)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: SubCategory[]) => (this.subcategories = response))
        )
      .subscribe();
    }
  }

  getbrands(){
    if(this.selectedCategoryID != 0){
      this.brandService
      .getBrands(this.selectedCategoryID)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: Brand[]) => (this.brands = response))
        )
      .subscribe();
    }
  }

  getbrandsIDs(){
    if(this.selectedCategoryID != 0){
      this.brandService
      .getBrandsID(this.selectedCategoryID)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: number[]) => (this.allBrandsIDsFromACategory = response))
        )
      .subscribe();
    }
  }

  getSubCategoriesIDs(){
    if(this.selectedCategoryID != 0){
      this.categoryService
      .getSubCategoriesID(this.selectedCategoryID)
        .pipe(
          takeUntil(this.$_destroyed),
          map((response: number[]) => (this.allSubCategoriesIDsFromACategory = response))
        )
      .subscribe();
    }
  }

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

  getOrderByTypes(){
    this.orderByTypeService
    .getOrderByTypes()
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: OrderByType[]) => (
          this.orderByOptions = response))
      )
    .subscribe();
  }

  getLocations(event: any){
    this.selectedProvinceID = event == '--Seleccionar--' ? 0 : event;
    this.getLocationsIDs();
    this.applyFilters();
    this.addressService
    .getLocations(this.selectedProvinceID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Location[]) => (this.locations = response))
      )
    .subscribe();
  }

  getLocationsIDs(){
    this.addressService
    .getLocationsIDs(this.selectedProvinceID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: number[]) => (this.allLocationIDsFromAProvince = response))
      )
    .subscribe();
  }

  updateSelectedLocationID(event: any){
    this.selectedLocationIDs = event != -1 ? event : this.allLocationIDsFromAProvince;
    this.applyFilters();
  }

  updateSelectedBrandID(event: any){
    this.selectedBrandsIDs = event != -1 ? event : this.allBrandsIDsFromACategory;
    this.applyFilters();
  }

  updateSelectedSubCategoryID(event: any){
    this.selectedSubCategoryIDs = event != -1 ? event : this.allSubCategoriesIDsFromACategory;
    this.applyFilters();
  }

  updateSelectedLeasingFilterFlag(event: any){
    this.selectedLeasingFilterFlag = event;
    if(this.selectedLeasingFilterFlag === false){
      this.selectedLeasingFilterFlag = null;
    }
    this.applyFilters();
  }

  filteredPostsToShow(): void {
    this.postsToShow = this.posts.filter(post =>
                      post.title.toLocaleLowerCase().includes(this.selectedTitle.toLocaleLowerCase()));
    this.postsToShow.forEach( post => {
      if(post.title.length >= 45){
        post.title = post.title.slice(0, 45) + '...';
      }
    });
    this.showEmptyMessage = this.postsToShow.length == 0;
    this.dialog.closeAll();
  }

  getPostForAuthor(){
    this.postService
    .getPostByAuthor(this.user.id)
    .pipe(
      take(1),
      takeUntil(this.$_destroyed),
      map((response: Post[]) => this.posts = response))
    .subscribe(() => {
      this.filteredPostsToShow()
    },
    (error) => {
      console.log('error',error);
      this.dialog.closeAll();
    });
  }

  getDefaultPostsToShow(): void {

    this.postService
      .getAllPosts(this.user.address.location.province.id)
      .pipe(
        take(1),
        takeUntil(this.$_destroyed),
        map((response: Post[]) => this.posts = response))
      .subscribe(() => {
        this.filteredPostsToShow()
      },
      (error) => {
        console.log('error',error);
        this.dialog.closeAll();
      });
  }

  sendTo(post: Post){
    this.router.navigate(['posts/view', post.id]);
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  orderBy: string = '';
	orderBySelected(value: string): void { // aplicar ordenamiento a la lista
		this.orderBy = value;
    this.applyFilters();
	}

  cleanFilters(){
    this.selectedLocationIDs = [];
    this.selectedSubCategoryIDs = [];
    this.selectedProvinceID = undefined;
    this.selectedCategoryID = 0;
    this.selectedTitle = "";
    this.selectedBrandsIDs = [];
    this.selectedLeasingFilterFlag = null;
    (<HTMLInputElement>document.getElementById('category')).value = "0";
    (<HTMLInputElement>document.getElementById('province')).value = "0";
    this.applyFilters();
  }

  applyFilters(){
    console.log(this.selectedProvinceID)

    this.postService
      .getActivePostsBySubCategoryAndLocationAndProvince(this.selectedSubCategoryIDs, this.selectedCategoryID,this.selectedLocationIDs, this.selectedBrandsIDs,this.selectedProvinceID, this.orderBy, this.activeFlag, this.selectedLeasingFilterFlag)
      .pipe(
        take(1),
        takeUntil(this.$_destroyed),
        map((response: Post[]) => this.posts = response))
      .subscribe(() => this.filteredPostsToShow());
  }

  showAllFilters = false;
  showLabel = 'Mostrar opciones de filtros'
  showFilters(){
    this.showAllFilters = !this.showAllFilters;
    this.showLabel = this.showLabel == 'Mostrar opciones de filtros' ? 'Esconder filtros' : 'Mostrar opciones de filtros';
  }

}
