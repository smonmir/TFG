import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { Usuario } from 'src/app/clases/modelos/usuario/usuario';
import { Valoracion } from 'src/app/clases/modelos/valoracion/valoracion';
import { ServicioService } from 'src/app/clases/servicios/servicio/servicio.service';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';
import { ValoracionService } from 'src/app/clases/servicios/valoracion/valoracion.service';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.page.html',
  styleUrls: ['./detalle-servicio.page.scss'],
})
export class DetalleServicioPage implements OnInit {

  servicio!: Servicio;
  valoraciones: Valoracion[] = [];
  nuevaValoracion: { puntuacion: number; comentario: string } = { puntuacion: 0, comentario: '' };
  usuario!: Usuario;
  miValoracion!: Valoracion | undefined;
  cargando = true;

  constructor(private router: Router, private servicioService: ServicioService, private valoracionService: ValoracionService, private usuarioService: UsuarioService) { }

  async ionViewWillEnter() {
    try {
      this.usuario = this.usuarioService.getUsuario();
      this.servicio = this.servicioService.getServicio();
      this.valoraciones = await this.valoracionService.getValoracionesPorServicio(this.servicio.getId());
      this.miValoracion = this.valoraciones.find(v => v.usuario.getId() === this.usuario.getId());
    } catch (error) {
      console.error(error);
    } finally {
      this.cargando = false;
    }
  }

  async ngOnInit() {
    try {
      this.usuario = this.usuarioService.getUsuario();
      this.servicio = this.servicioService.getServicio();
      this.valoraciones = await this.valoracionService.getValoracionesPorServicio(this.servicio.getId());
      this.miValoracion = this.valoraciones.find(v => v.usuario.getId() === this.usuario.getId());
    } catch (error) {
      console.error(error);
    } finally {
      this.cargando = false;
    }
  }

  irPago() {
    this.router.navigate(['/tabs/pago']);
  }

  irHome() {
    this.router.navigate(['/tabs']);
  }

  async agregarValoracion() {
    const nuevaValoracion = {
      puntuacion: this.nuevaValoracion.puntuacion,
      comentario: this.nuevaValoracion.comentario,
      usuario_id: this.usuario.getId(),
      servicio_id: this.servicio.getId()
    };
    await this.valoracionService.createValoracion(nuevaValoracion);
    this.valoraciones = await this.valoracionService.getValoracionesPorServicio(this.servicio.getId());
    this.miValoracion = this.valoraciones.find(v => v.usuario.getId() === this.usuario.getId());
  }

  async actualizarValoracion() {
    if (!this.miValoracion) {
      console.error('No hay valoración para actualizar');
      return;
    }
    const actualizacion = {
      puntuacion: this.miValoracion.getPuntuacion(),
      comentario: this.miValoracion.getComentario()
    };
    await this.valoracionService.actualizarValoracion(this.miValoracion.id, actualizacion);
    this.valoraciones = await this.valoracionService.getValoracionesPorServicio(this.servicio.getId());
  }

  async eliminarValoracion() {
    if (!this.miValoracion) {
      console.error('No hay valoración para eliminar');
      return;
    }
    await this.valoracionService.eliminarValoracion(this.miValoracion.id);
    this.valoraciones = await this.valoracionService.getValoracionesPorServicio(this.servicio.getId());
    this.miValoracion = undefined;
  }
}
