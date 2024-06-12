import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise(async (resolve) => {
      const expectedRole = next.data['role'];
      await this.usuarioService.checkToken();
      const usuario = this.usuarioService.getUsuario();
      
      if (usuario && usuario.getRol().getNombre() === expectedRole) {
        resolve(true);
      } else {
        this.router.navigate(['/tabs/login']);
        resolve(false);
      }
    });
  }
  
}
