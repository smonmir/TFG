import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/clases/servicios/localStorage/local-storage.service';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private usuarioService: UsuarioService, private localStorage: LocalStorageService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve) => {
      await this.usuarioService.checkToken();
      if (!this.usuarioService.getUsuarioAutenticado()) {
        this.router.navigate(['/tabs/login']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
