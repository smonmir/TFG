import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { ServicioService } from 'src/app/clases/servicios/servicio/servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  servicios: any[] = [];

  constructor(private router: Router, private servicioService: ServicioService) {}


  ngOnInit() {
    this.cargarServicios();
  }


  cargarServicios() {
    this.servicioService.getServicios()
      .then(data => {
        this.servicios = data;
      })
      .catch(error => {
        console.error('Error cargando servicios', error);
      });
  }

  verDescripcionServicio(servicio: Servicio): void {
    this.servicioService.setServicio(servicio);
    this.router.navigate(['/detalle-servicio']);
  }

}
