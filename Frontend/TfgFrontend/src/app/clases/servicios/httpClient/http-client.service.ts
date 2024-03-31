import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private readonly API_URL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  
  async login(nombre: string, contrasena: string): Promise<any> {
    return await this.http.post<any>(`${this.API_URL}/login`, { nombre: nombre, contrasena: contrasena }).toPromise();
  }

  get<T>(url: string, token: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<T>(`${this.API_URL}/${url}`, {headers});
  }

  post<T>(url: string, data: any, token: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<T>(`${this.API_URL}/${url}`, data, {headers});
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${url}`, data);
  }

  delete<T>(url: string, token: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<T>(`${this.API_URL}/${url}`,  {headers});
  }
}
