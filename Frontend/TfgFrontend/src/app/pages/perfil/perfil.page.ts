import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/modelos/usuario/usuario';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario!: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    /*
    this.usuario = new Usuario('Juan Perez', 'juan.perez@example.com', 'password123');
    this.usuario.setTelefono('123456789');
    this.usuario.setDireccion('Calle Falsa 123');
    */
  }


}
