import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private readonly API_URL = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  
  async login(email: string, contrasena: string, USER_URL: string): Promise<any> {
    return await this.http.post<any>(`${this.API_URL}/${USER_URL}/login`, { email: email, contrasena: contrasena }).toPromise();
  }

  async registro(nombre: string, email: string, contrasena: string, rol_id: number, USER_URL: string): Promise<any> {
    return await this.http.post<any>(`${this.API_URL}/${USER_URL}`, { nombre: nombre, email: email, contrasena: contrasena, rol_id: rol_id }).toPromise();
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

    return await this.http.get<T>(`${this.API_URL}/${url}`, options).toPromise();
  }

  async post<T>(url: string, data: any, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return await this.http.post<T>(`${this.API_URL}/${url}`, data, { headers }).toPromise();
  }

  async patch<T>(url: string, data: any, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return await this.http.patch<T>(`${this.API_URL}/${url}`, data, {headers}).toPromise();
  }

  async delete<T>(url: string, token: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return await this.http.delete<T>(`${this.API_URL}/${url}`,  {headers}).toPromise();
  }
}
