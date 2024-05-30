import { Usuario } from "../usuario/usuario";

export class Servicio {
    private id: number;
    private nombre: string;
    private descripcion: string;
    private precio: number;
    private imagen: string;
    private usuario: Usuario;
  
    constructor(id: number, nombre: string, descripcion: string, precio: number, imagen: string, usuario: Usuario) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
      this.usuario = usuario;
    }
  
    // Getters
    public getId(): number {
      return this.id;
    }
  
    public getNombre(): string {
      return this.nombre;
    }
  
    public getDescripcion(): string {
      return this.descripcion;
    }
  
    public getPrecio(): number {
      return this.precio;
    }
  
    public getImagen(): string {
      return this.imagen;
    }
  
    public getUsuario(): Usuario {
      return this.usuario;
    }
  
    // Setters
    public setId(id: number): void {
      this.id = id;
    }
  
    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  
    public setDescripcion(descripcion: string): void {
      this.descripcion = descripcion;
    }
  
    public setPrecio(precio: number): void {
      this.precio = precio;
    }
  
    public setImagen(imagen: string): void {
      this.imagen = imagen;
    }
  
    public setUsuario(usuario: Usuario): void {
      this.usuario = usuario;
    }
  }
  