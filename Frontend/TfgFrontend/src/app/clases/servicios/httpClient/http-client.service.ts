import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private readonly API_URL = 'https://tfg-backend-production-bd12.up.railway.app/api';
  //private readonly API_URL = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  
  async login(email: string, contrasena: string, USER_URL: string): Promise<any> {
    try{
      return await this.http.post<any>(`${this.API_URL}/${USER_URL}/login`, { email: email, contrasena: contrasena }).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async registro(nombre: string, email: string, contrasena: string, telefono: string, rol_id: number, USER_URL: string): Promise<any> {
    try{
      return await this.http.post<any>(`${this.API_URL}/${USER_URL}`, { nombre: nombre, email: email, contrasena: contrasena, telefono: telefono, rol_id: rol_id }).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async enviarCodigoVerificacion(email: string, USER_URL: string): Promise<any> {
    try{
      return await this.http.post<any>(`${this.API_URL}/${USER_URL}/codigo/enviarCodigo`, { email }).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async verificarCodigo(email: string, codigo: string, USER_URL: string): Promise<any> {
    try{
      return await this.http.post<any>(`${this.API_URL}/${USER_URL}/verificarCodigo`, { email, codigo }).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async verifyToken(token: string, USER_URL: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try{
      return await this.http.get<any>(`${this.API_URL}/${USER_URL}/me`, { headers }).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  /*
  async get<T>(url: string, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return await this.http.get<T>(`${this.API_URL}/${url}`, {headers}).toPromise();
  }
  */

  async get<T>(url: string, token: any, params: any = {}): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers,
      params: params
    };
    try{
      return await this.http.get<T>(`${this.API_URL}/${url}`, options).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async post<T>(url: string, data: any, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      return await this.http.post<T>(`${this.API_URL}/${url}`, data, { headers }).toPromise();
    }
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async patch<T>(url: string, data: any, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.patch<T>(`${this.API_URL}/${url}`, data, { headers }).toPromise();
    } 
    catch (error: any) {
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }

  async delete<T>(url: string, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.delete<T>(`${this.API_URL}/${url}`,  {headers}).toPromise();
    }
    catch(error: any){
      if (error.status && error.error) {
        throw error;
      }
      throw new Error('Error desconocido');
    }
  }
}
