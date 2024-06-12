import { Estado } from "../estado/estado";
import { Servicio } from "../servicio/servicio";
import { Usuario } from "../usuario/usuario";

export class Pedido {
    id: number;
    precio: number;
    fecha: Date;
    direccion: string;
    usuario: Usuario;
    servicio: Servicio;
    estado: Estado;
  
    constructor(id: number,precio: number,fecha: Date, direccion: string, usuario: Usuario,servicio: Servicio,estado: Estado) {
      this.id = id;
      this.precio = precio;
      this.fecha = fecha;
      this.direccion = direccion;
      this.usuario = usuario;
      this.servicio = servicio;
      this.estado = estado;
    }
  
    //Getters
    getId(): number {
      return this.id;
    }
  
    getPrecio(): number {
      return this.precio;
    }
  
    getFecha(): Date {
      return this.fecha;
    }

    getDireccion(): string {
      return this.direccion;
    }
  
    getUsuario(): Usuario {
      return this.usuario;
    }
  
    getServicio(): Servicio {
      return this.servicio;
    }
  
    getEstado(): Estado {
      return this.estado;
    }
  
    //Setters
    setId(id: number): void {
      this.id = id;
    }
  
    setPrecio(precio: number): void {
      this.precio = precio;
    }
  
    setFecha(fecha: Date): void {
      this.fecha = fecha;
    }

    setDireccion(direccion: string): void {
      this.direccion = direccion;
    }
  
    setUsuario(usuario: Usuario): void {
      this.usuario = usuario;
    }
  
    setServicio(servicio: Servicio): void {
      this.servicio = servicio;
    }
  
    setEstado(estado: Estado): void {
      this.estado = estado;
    }
  }
  