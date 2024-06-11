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

  /*
  private idUsuario$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  private idUsuario!: number

  private direccionUsuario!: string

  private nombreUsuario!: string
  */

  constructor(private httpClientService: HttpClientService,  private localStorageService: LocalStorageService) {}

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
          data.user.direccion,
          rol
        );
      }
    })
    .catch((error)=>{
      console.error('Error al iniciar sesion:', error);
      throw error;
    })
  }

  async registro(nombre: string, email: string, contrasena: string, rol: string): Promise<any> {
    try{
      let rol_id = 2;
      if(rol == "vendedor"){
        rol_id = 3;
      }
      await this.httpClientService.registro(nombre, email, contrasena, rol_id, this.USER_URL)
    }
    catch(error){
      console.error('Error al registrarse:', error);
      throw error;
    }
  }

  async logout(): Promise<any>{
    this.usuarioAutenticado= false;
    return this.localStorageService.removeToken();
  }

  getUsuario(){
    return this.usuario;
  }

  /*
  getIdUsuario(){
    return this.idUsuario
  }

  getIdDireccion(){
    return this.direccionUsuario;
  }

  getIdUsuario$(): Observable<number>{
    return from(this.setUserByName()).pipe(
      switchMap(() => this.idUsuario$.asObservable())
    );
  }


  setUserByName(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.apiService.get<any>(`${this.USER_URL}/obtenerusuario/${this.nombreUsuario}`, this.localStorageService.getToken()).subscribe(
        (data) => {
          this.usuario = new Usuario(data.nombre, data.apellido, data.email, data.contrasena, data.direccion, data.telefono);
          this.usuario.setId(data.idUsuario);
          this.idUsuario = data.idUsuario;
          this.direccionUsuario = data.direccion
          this.idUsuario$.next(data.idUsuario);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.apiService.get<Usuario[]>(this.USER_URL, this.localStorageService.getToken());
  }

  getUserById(id: number): Observable<Usuario> {
    return this.apiService.get<Usuario>(`${this.USER_URL}/${id}`, this.localStorageService.getToken());
  }

  createUser(usuario: Usuario): Observable<Usuario> {
    return this.apiService.register<Usuario>(`${this.USER_URL}/crearusuario`, usuario);
  }

  updateUser(id: number, usuario: Usuario): Observable<Usuario> {
    return this.apiService.put<Usuario>(`${this.USER_URL}/${id}`, usuario);
  }

  
  deleteUser(id: number): Observable<Usuario> {
    return this.apiService.delete<Usuario>(`${this.USER_URL}/${id}`, this.localStorageService.getToken());
  }
  */
}
