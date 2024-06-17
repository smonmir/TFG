import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario/usuario';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { HttpClientService } from '../httpClient/http-client.service';
import { Rol } from '../../modelos/rol/rol';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly USER_URL = 'usuario';

  private usuario!: Usuario;

  private usuarioAutenticado: boolean = false;


  constructor(private httpClientService: HttpClientService,  private localStorageService: LocalStorageService) {
    this.checkToken();
  }

  getUsuarioAutenticado(): boolean{
    return this.usuarioAutenticado;
  }

  async login(email: string, contrasena: string): Promise<any> {
    await this.httpClientService.login(email, contrasena, this.USER_URL)
    .then((data)=>{
      if(data.token != undefined){
        this.localStorageService.setToken(data.token);
        this.usuarioAutenticado = true;
        const rol = new Rol(data.user.rol.id, data.user.rol.nombre, data.user.rol.descripcion);
        this.usuario = new Usuario(
          data.user.id,
          data.user.nombre,
          data.user.email,
          data.user.contrasena,
          data.user.telefono,
          rol
        );
      }
    })
    .catch((error)=>{
      console.error('Error al iniciar sesion:', error);
      throw error;
    })
  }

  async registro(datosRegistro: any): Promise<any> {
    const { nombre, email, contrasena, telefono, rol } = datosRegistro;
    let rol_id = 2;
    if (rol == "vendedor") {
      rol_id = 3;
    }
    return await this.httpClientService.registro(nombre, email, contrasena, telefono, rol_id, this.USER_URL);
  }

  async enviarCodigoVerificacion(email: string): Promise<any> {
    return await this.httpClientService.enviarCodigoVerificacion(email, this.USER_URL);
  }

  async verificarCodigo(email: string, codigo: string): Promise<any> {
    return await this.httpClientService.verificarCodigo(email, codigo, this.USER_URL);
  }

  async logout(): Promise<any>{
    this.usuarioAutenticado= false;
    return this.localStorageService.removeToken();
  }

  getUsuario(){
    return this.usuario;
  }

  async checkToken(): Promise<void> {
    const token = this.localStorageService.getToken();
    if (token) {
        try {
            const data = await this.httpClientService.verifyToken(token, this.USER_URL);
            this.usuarioAutenticado = true;
            const rol = new Rol(data.user.rol.id, data.user.rol.nombre, data.user.rol.descripcion);
            this.usuario = new Usuario(
              data.user.id,
              data.user.nombre,
              data.user.email,
              data.user.contrasena,
              data.user.telefono,
              rol
          );
        } catch (error) {
            console.error('Error al verificar el token:', error);
            this.localStorageService.removeToken();
        }
    }
  }

  async actualizarUsuario(data: any): Promise<any> {
    const token = this.localStorageService.getToken();
    if (!token) throw new Error('Token no encontrado');
    const usuarioData = await this.httpClientService.patch<any>(`usuario/${this.usuario.getId()}`, data, token);
    this.usuario.setContrasena(usuarioData.contrasena);
    this.usuario.setEmail(usuarioData.email);
    this.usuario.setNombre(usuarioData.nombre);
    this.usuario.setTelefono(usuarioData.telefono);
  }

}
