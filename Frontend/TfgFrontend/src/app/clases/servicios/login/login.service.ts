import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private autenticado: boolean = false;

  constructor() { }


  getAutenticado(): boolean{
    return this.autenticado;
  }


  
}
