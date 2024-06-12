import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/clases/modelos/rol/rol';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  
  rol?: Rol;
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  isCliente(): boolean {
    const usuario = this.usuarioService.getUsuario();
    if(usuario){
      return this.usuarioService.getUsuario().getRol().getNombre() == 'comprador';
    }
    return true;
  }

  isVendedor(): boolean {
    const usuario = this.usuarioService.getUsuario();
    if(usuario){
      return this.usuarioService.getUsuario().getRol()?.getNombre() == 'vendedor';
    }
    return false;
  }

}
