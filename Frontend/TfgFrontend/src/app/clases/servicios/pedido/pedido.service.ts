import { Injectable } from '@angular/core';
import { Pedido } from '../../modelos/pedido/pedido';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { HttpClientService } from '../httpClient/http-client.service';
import { Servicio } from '../../modelos/servicio/servicio';
import { ServicioService } from '../servicio/servicio.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Estado } from '../../modelos/estado/estado';
import { Usuario } from '../../modelos/usuario/usuario';
import { Rol } from '../../modelos/rol/rol';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly PEDIDO_URL = 'pedido';

  servicio!: Servicio;

  pedidos: Pedido[] = [];

  constructor(private httpClient: HttpClientService, private localStorage: LocalStorageService, private servicioService: ServicioService, private usuarioService: UsuarioService) { }

  getServicio(): Servicio{
    return this.servicio = this.servicioService.getServicio();
  }

  async getPedidosUsuario(): Promise<any>{
    try{
      const token = this.localStorage.getToken();
      const usuario = this.usuarioService.getUsuario();
      const data = await this.httpClient.get<any[]>(`${this.PEDIDO_URL}/usuario/${usuario.getId()}`, token)
      this.pedidos = data.map((pedidoData: any) => {
        const estadoData = pedidoData.estado;
        const usuarioData = pedidoData.usuario;
        const rolData = usuarioData.rol;
        const servicioData = pedidoData.servicio;

        const estado = new Estado(
          estadoData.id,
          estadoData.nombre,
          estadoData.descripcion
        );

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

        const servicio = new Servicio(
          servicioData.id,
          servicioData.nombre,
          servicioData.descripcion,
          servicioData.precio,
          servicioData.imagen,
          usuario
        );

        return new Pedido(
          pedidoData.id,
          pedidoData.precio,
          pedidoData.fecha,
          usuario,
          servicio,
          estado
        );
      });
      return this.pedidos;
    }
    catch(error){
      console.log(error);
    }

  }


  async realizarPago(): Promise<any> {
    const token = this.localStorage.getToken();
    if (!token) {
      return Promise.reject('No se encontró el token');
    }

    let datosPedido = {
      fecha: this.getFechaHorarioActual(),
      precio: this.servicio.getPrecio(),
      usuario_id: this.usuarioService.getUsuario().getId(),
      servicio_id: this.servicio.getId(),
      estado_id: 8
    }

    
    await this.httpClient.post<any[]>(this.PEDIDO_URL, datosPedido, token)
      .then((data) => {
        return data;
      })
      .catch(error => {
        console.error('Error realizando el pago', error);
        return Promise.reject(error);
      });
      
  }

  private getFechaHorarioActual(){
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 19).replace('T', ' ');
    return localISOTime;
  }

}
