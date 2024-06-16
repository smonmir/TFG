import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpClient/http-client.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Valoracion } from '../../modelos/valoracion/valoracion';
import { Rol } from '../../modelos/rol/rol';
import { Usuario } from '../../modelos/usuario/usuario';
import { Servicio } from '../../modelos/servicio/servicio';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  private readonly VALORACION_URL = 'valoracion';

  valoraciones: Valoracion[] = [];

  constructor(private httpClient: HttpClientService, private localStorage: LocalStorageService) {}

  async getValoracionesPorServicio(servicioId: number): Promise<any[]> {
    try {
      const data = await this.httpClient.get<any[]>(`${this.VALORACION_URL}/${servicioId}`, "");
      this.valoraciones = data.map((valoracionData: any) => {
        const usuarioData = valoracionData.usuario;
        const rolData = usuarioData.rol;
        const servicioData = valoracionData.servicio

        const rol = new Rol(rolData.id, rolData.nombre, rolData.descripcion);
        const usuario = new Usuario(
          usuarioData.id,
          usuarioData.nombre,
          usuarioData.email,
          usuarioData.contrasena,
          usuarioData.telefono,
          rol
        );

        const servicio = new Servicio(
          servicioData.id,
          servicioData.nombre,
          servicioData.descripcion,
          servicioData.precio,
          servicioData.imagen,
          usuario
        );

        return new Valoracion(
          valoracionData.id,
          valoracionData.puntuacion,
          valoracionData.comentario,
          usuario,
          servicio
        )
      });
      return this.valoraciones;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  async createValoracion(valoracion: any): Promise<any> {
    const token = this.localStorage.getToken();
    return this.httpClient.post<any>(this.VALORACION_URL, valoracion, token);
  }

  async actualizarValoracion(valoracionId: number, valoracion: any): Promise<any> {
    const token = this.localStorage.getToken();
    return this.httpClient.patch<Valoracion>(`${this.VALORACION_URL}/${valoracionId}`, valoracion, token);
  }

  async eliminarValoracion(valoracionId: number): Promise<void> {
    const token = this.localStorage.getToken();
    return this.httpClient.delete<void>(`${this.VALORACION_URL}/${valoracionId}`, token);
  }

}
