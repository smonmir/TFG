import { Servicio } from "../servicio/servicio";
import { Usuario } from "../usuario/usuario";

export class Valoracion {

    public id!: number
    public servicio!: Servicio
    public puntuacion!: number
    public comentario!: string
    public usuario!: Usuario

    constructor(id: number, puntuacion: number, comentario: string, usuario: Usuario, servicio: Servicio) {
        this.id = id;
        this.servicio = servicio;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.usuario = usuario;
    }
  
  //Getters
  getId(): number {
    return this.id;
  }

  getServicio(): Servicio {
    return this.servicio;
  }

  getPuntuacion(): number {
    return this.puntuacion;
  }

  getComentario(): string {
    return this.comentario;
  }

  getUsuario(): Usuario {
    return this.usuario;
  }

  //Setters
  setId(id: number) {
    this.id = id;
  }

  setServicio(servicio: Servicio) {
    this.servicio = servicio;
  }

  setPuntuacion(puntuacion: number) {
    this.puntuacion = puntuacion;
  }

  setComentario(comentario: string) {
    this.comentario = comentario;
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }
}
  