import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { ServicioService } from 'src/app/clases/servicios/servicio/servicio.service';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.page.html',
  styleUrls: ['./detalle-servicio.page.scss'],
})
export class DetalleServicioPage implements OnInit {

  servicio!: Servicio;

  constructor(private router: Router, private servicioService: ServicioService) { }

  ngOnInit() {
    this.servicio = this.servicioService.getServicio();
  }


  irPago(){
    this.router.navigate(['/pago']);
  }

  irHome(){
    this.router.navigate(['/tabs']);
  }
}
