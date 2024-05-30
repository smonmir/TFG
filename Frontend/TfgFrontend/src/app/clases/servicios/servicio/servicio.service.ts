import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpClient/http-client.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Servicio } from '../../modelos/servicio/servicio';
import { Rol } from '../../modelos/rol/rol';
import { Usuario } from '../../modelos/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private readonly SERVICIO_URL = 'servicio';

  servicios: Servicio[] = [];

  private servicio!: Servicio;

  private token: string | null =  this.localStorage.getToken();

  constructor(private httpClient: HttpClientService, private localStorage: LocalStorageService) { }

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
          usuarioData.direccion,
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


}
