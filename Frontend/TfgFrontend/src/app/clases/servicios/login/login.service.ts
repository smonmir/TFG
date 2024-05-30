import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpClient/http-client.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /*
  private usuarioAutenticado: boolean = false;

  constructor(private httpService: HttpClientService, private localStorageService: LocalStorageService) { }


  getUsuarioAutenticado(): boolean{
    return this.usuarioAutenticado;
  }


  async login(email: string, contrasena: string): Promise<any> {
    await this.httpService.login(email, contrasena)
    .then((user)=>{
      if(user.token != undefined){
        this.localStorageService.setToken(user.token);
        this.usuarioAutenticado = true;
      }
    })
    .catch((error)=>{
      console.error('Error al iniciar sesion:', error);
    })
  }


  async registro(nombre: string, email: string, contrasena: string): Promise<any> {
    try{
      await this.httpService.registro(nombre, email, contrasena)
    }
    catch(error){
      console.error('Error al iniciar sesion:', error);
    }
  }

  */
  
}
