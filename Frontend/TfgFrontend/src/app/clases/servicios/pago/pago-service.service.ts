import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ServicioService } from '../servicio/servicio.service';
import { Servicio } from '../../modelos/servicio/servicio';
import { HttpClientService } from '../httpClient/http-client.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PagoServiceService {

  private readonly PEDIDO_URL = 'pedido';

  servicio!: Servicio;

  constructor(private httpClient: HttpClientService, private localStorage: LocalStorageService, private servicioService: ServicioService, private usuarioService: UsuarioService) { }

  getServicio(): Servicio{
    return this.servicio = this.servicioService.getServicio();
  }


  async realizarPago(): Promise<any> {
    const token = this.localStorage.getToken();
    if (!token) {
      return Promise.reject('No se encontró el token');
    }

    let datosPedido = {
      fecha: new Date().toISOString(),
      precio: this.servicio.getPrecio(),
      usuarioId: this.usuarioService.getUsuario().getId(),
      servicioId: this.servicio.getId(),
      estado: 'Pendiente'
    }

    const data = await this.httpClient.post<any[]>(this.PEDIDO_URL, datosPedido, token)
      .then((data) => {
        return data;
      })
      .catch(error => {
        console.error('Error realizando el pago', error);
        return Promise.reject(error);
      });
    
    return Promise.reject('No se encontró el token');
  }

}
