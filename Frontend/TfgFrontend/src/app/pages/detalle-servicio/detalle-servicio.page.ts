import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { Usuario } from 'src/app/clases/modelos/usuario/usuario';
import { Valoracion } from 'src/app/clases/modelos/valoracion/valoracion';
import { LocalStorageService } from 'src/app/clases/servicios/localStorage/local-storage.service';
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
  usuario!: Usuario;
  miValoracion!: Valoracion | undefined;
  cargando = true;
  valoracionForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private servicioService: ServicioService, private valoracionService: ValoracionService, private usuarioService: UsuarioService, private token: LocalStorageService) {
    this.valoracionForm = this.formBuilder.group({
      puntuacion: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      comentario: ['', Validators.required]
    });
  }

  async ionViewWillEnter() {
    await this.cargarDatos();
  }

  async ngOnInit() {
    await this.cargarDatos();
  }

  private async cargarDatos() {
    try {
      this.miValoracion = undefined;
      this.cargando = true;
      this.usuario = this.usuarioService.getUsuario();
      this.servicio = this.servicioService.getServicio();
      this.valoraciones = await this.valoracionService.getValoracionesPorServicio(this.servicio.getId());
      if(this.usuario){
        this.miValoracion = this.valoraciones.find(v => v.usuario.getId() === this.usuario.getId());
      }
      if (this.miValoracion) {
        this.valoracionForm.patchValue({
          puntuacion: this.miValoracion.getPuntuacion(),
          comentario: this.miValoracion.getComentario()
        });
      }
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
    if(this.token.getToken()){
      if (this.valoracionForm.invalid) {
        return;
      }
      const nuevaValoracion = {
        puntuacion: this.valoracionForm.value.puntuacion,
        comentario: this.valoracionForm.value.comentario,
        usuario_id: this.usuario.getId(),
        servicio_id: this.servicio.getId()
      };
      try {
        await this.valoracionService.createValoracion(nuevaValoracion);
        await this.cargarDatos();
      } catch (error) {
        console.error(error);
      }
    }
    else{
      this.router.navigate(['tabs/login']);
    }

  }

  async actualizarValoracion() {
    if (this.valoracionForm.invalid || !this.miValoracion) {
      return;
    }
    const actualizacion = {
      puntuacion: this.valoracionForm.value.puntuacion,
      comentario: this.valoracionForm.value.comentario,
      usuario_id: this.usuario.getId(),
      servicio_id: this.servicio.getId()
    };
    try {
      await this.valoracionService.actualizarValoracion(this.miValoracion.id, actualizacion);
      await this.cargarDatos();
    } catch (error) {
      console.error(error);
    }
  }

  async eliminarValoracion() {
    if (!this.miValoracion) {
      return;
    }
    try {
      await this.valoracionService.eliminarValoracion(this.miValoracion.id);
      await this.cargarDatos();
      this.valoracionForm.reset();
    } catch (error) {
      console.error(error);
    }
  }
}
