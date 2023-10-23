import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { logoutURL } from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  logout(): Observable<any> {
    // Se debe enviar el token de sesión en el encabezado Authorization
    const token = sessionStorage.getItem('token');

    // Se debe enviar el token de sesión en el encabezado Authorization
    const headers = new HttpHeaders().set('Authorization', token || '');
    
    return this.http.post(logoutURL, null, { headers });
  }

  /*
  goToLogin(): void {
    window.location.href = this.config.getConfig('casUrl') + '/login?'
      + new URLSearchParams({ service: encodeURI(this.config.getConfig('appUrl')) }).toString();
  }

  goToLogout(): void {
    window.location.href = this.config.getConfig('casUrl') + '/logout?'
      + new URLSearchParams({ service: encodeURI(this.config.getConfig('appUrl')) }).toString();
  }
*/

  goTo(path: string): void {
    this.router.navigate(['./' + path]);
  }

  goToCrudOffice(): void {
    this.router.navigate(['./home/crud/oficinas']);
  }

  goToResourcesState(): void {
    this.router.navigate(['./home/crud/estados']);
  }

  goToCrudMotive(): void {
    this.router.navigate(['./home/crud/motivos']);
  }

  goToBrands(): void {
    this.router.navigate(['./home/crud/marcas']);
  }

  goToResourceContractorList(): void {
    this.router.navigate(['./home/recursos/contractors']);
  }

  goToResourceList(): void {
    this.router.navigate(['./home/recursos']);
  }

  goToResourcePool(): void {
    this.router.navigate(['./home/recursos/pool']);
  }

  goToFutureEntries(): void {
    this.router.navigate(['./home/futurosIngresos']);
  }

  goToResourceAudit(): void {
    this.router.navigate(['./home/recursos/audit']);
  }

  goToPoolScreen(): void {
    this.router.navigate(['./home/recursos/pantallaPool']);
  }

  goToDashboard(): void {
    this.router.navigate(['./home']);
  }

  goToReports(): void {
    this.router.navigate(['./home/reportes']);
  }

  goToAuthorizations(): void {
    this.router.navigate(['./home/autorizaciones']);
  }


  goToMobile(): void {
    this.router.navigate(['./home/crud/mobile']);
  }

  /*
  goToQRs(resources: Resource[]): void {
    this.router.navigate(['./home/recursos/qrs'], {
      state: { resources: resources }
    });
  }*/

  goToProfile(): void {
    this.router.navigate(['./home/perfil']);
  }

  goToSupplyDashboard(): void {
    this.router.navigate(['./home/insumos']);
  }
  goToSupplyColours(): void {
    this.router.navigate(['./home/insumos/umbrales']);
  }

  goToMinimumStock(): void {
    this.router.navigate(['./home/crud/stock']);
  }

  goToProvider(): void {
    this.router.navigate(['./home/crud/provider']);
  }

  goToUserHomePage(homePage: string): void {
    this.router.navigate([homePage]);
  }

  /*borrarCache(): void {
    this.cache.borrarTodaLaCache();
  }*/

  goToLoans(): void {
    this.router.navigate(['./home/prestamos']);
  }

  goToIPGroups(): void {
    this.router.navigate(['./home/gruposIP'])
  }
}
