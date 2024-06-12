import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpClient/http-client.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Servicio } from '../../modelos/servicio/servicio';
import { Rol } from '../../modelos/rol/rol';
import { Usuario } from '../../modelos/usuario/usuario';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private readonly SERVICIO_URL = 'servicio';

  servicios: Servicio[] = [];

  private servicio!: Servicio;

  constructor(private httpClient: HttpClientService, private localStorage: LocalStorageService) { }

  async getServiciosPaginados(page: number = 1, limit: number = 8, search: string = ''): Promise<any> {
    try {
      const params = { page: page.toString(), limit: limit.toString(), search: search };
      const data = await this.httpClient.get<any[]>(`${this.SERVICIO_URL}/paginados`, "", params);

      this.servicios = data.servicios.map((servicioData: any) => {
        const usuarioData = servicioData.usuario;
        const rolData = usuarioData.rol;

        const rol = new Rol(rolData.id, rolData.nombre, rolData.descripcion);
        const usuario = new Usuario(
          usuarioData.id,
          usuarioData.nombre,
          usuarioData.email,
          usuarioData.contrasena,
          usuarioData.telefono,
          rol
        );

        return new Servicio(
          servicioData.id,
          servicioData.nombre,
          servicioData.descripcion,
          servicioData.precio,
          servicioData.imagen,
          usuario
        );
      });

      return {
        servicios: this.servicios,
        totalPages: data.totalPages,
        currentPage: data.currentPage
      };
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  async getServicios(): Promise<any[]> {
    try {
      const data = await this.httpClient.get<any[]>(this.SERVICIO_URL, "");
      this.servicios = data.map((servicioData: any) => {
        const usuarioData = servicioData.usuario;
        const rolData = usuarioData.rol;

        const rol = new Rol(rolData.id, rolData.nombre, rolData.descripcion);
        const usuario = new Usuario(
          usuarioData.id,
          usuarioData.nombre,
          usuarioData.email,
          usuarioData.contrasena,
          usuarioData.telefono,
          rol
        );

        return new Servicio(
          servicioData.id,
          servicioData.nombre,
          servicioData.descripcion,
          servicioData.precio,
          servicioData.imagen,
          usuario
        );
      });
      return this.servicios;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  getServicio(): Servicio {
    return this.servicio;
  }

  setServicio(servicio: Servicio) {
    this.servicio = servicio;
  }

  async getServiciosUsuario(usuarioId: number): Promise<any[]> {
    const token = this.localStorage.getToken();
    const data = await this.httpClient.get<any[]>(`${this.SERVICIO_URL}/usuario/${usuarioId}`, token);
    
    return data.map((servicioData: any) => {
      const usuarioData = servicioData.usuario;
      const rolData = usuarioData.rol;

      const rol = new Rol(rolData.id, rolData.nombre, rolData.descripcion);
      const usuario = new Usuario(
        usuarioData.id,
        usuarioData.nombre,
        usuarioData.email,
        usuarioData.contrasena,
        usuarioData.telefono,
        rol
      );

      return new Servicio(
        servicioData.id,
        servicioData.nombre,
        servicioData.descripcion,
        servicioData.precio,
        servicioData.imagen,
        usuario
      );
    });
  }

  
  anadirServicio(servicio: any): Promise<any> {
    const token = this.localStorage.getToken();
    return this.httpClient.post<any>(this.SERVICIO_URL, servicio, token);
  }

  actualizarServicio(servicioId: number, servicio: any): Promise<any> {
    const token = this.localStorage.getToken();
    return this.httpClient.patch<any>(`${this.SERVICIO_URL}/${servicioId}`, servicio, token);
  }

  eliminarServicio(servicioId: number): Promise<any> {
    const token = this.localStorage.getToken();
    return this.httpClient.delete<any>(`${this.SERVICIO_URL}/${servicioId}`, token);
  }
  
 
}
