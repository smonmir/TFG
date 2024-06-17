import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { ServicioService } from 'src/app/clases/servicios/servicio/servicio.service';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-mis-servicios',
  templateUrl: './mis-servicios.page.html',
  styleUrls: ['./mis-servicios.page.scss'],
})
export class MisServiciosPage implements OnInit {

  servicios: Servicio[] = [];

  servicio!: Servicio;

  usuarioId: number | null = null;
  
  formularioServicio!: FormGroup;
  
  estaEditando = false;

  imagenBase64: string | null = null;

  constructor(private servicioService: ServicioService, private usuarioService: UsuarioService , private fb: FormBuilder) { }

  ngOnInit() {
    this.formularioServicio = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl ('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      imagen: new FormControl(null)
    });
    this.cargarServicios();
  }


  cargarServicios() {
    this.usuarioId = this.usuarioService.getUsuario().getId();
    this.servicioService.getServiciosUsuario(this.usuarioId)
    .then(data => {
      this.servicios = data;
    })
    .catch(error => {
      console.error('Error cargando servicios', error);
    });
  }


  anadirActualizrServicio() {
    if (this.formularioServicio.valid) {
      const formData = this.formularioServicio.value;
      formData.imagen = this.imagenBase64;
      formData.usuario_id = this.usuarioService.getUsuario().getId().toString();

      //Actualizar
      if (this.estaEditando) {
        this.servicioService.actualizarServicio(this.servicio.getId()!, formData)
        .then(() => {
          this.cargarServicios();
          this.resetForm();
        })
        .catch(error => {
          console.error('Error actualizando el servicio', error);
        });
      }
      else {
        //Añadir
        this.servicioService.anadirServicio(formData)
        .then(() => {
          this.cargarServicios();
          this.resetForm();
        })
        .catch(error => {
          console.error('Error añadiendo el servicio', error);
        });
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  editServicio(servicio: Servicio) {
    this.estaEditando = true;
    this.servicio = servicio;
    this.imagenBase64 = servicio.getImagen();
    this.formularioServicio.patchValue(servicio);
  }

  deleteServicio(servicio: Servicio) {
    this.servicioService.eliminarServicio(servicio.getId())
    .then(() => {
      this.cargarServicios();
    }).catch(error => {
      console.error('Error eliminando el servicio', error);
    });
  }

  resetForm() {
    this.estaEditando = false;
    this.imagenBase64 = null;
    this.formularioServicio.reset();
  }

}
