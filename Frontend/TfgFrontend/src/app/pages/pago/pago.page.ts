import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { PedidoService } from 'src/app/clases/servicios/pedido/pedido.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  servicio!: Servicio;

  detalleContratacion = {
    direccion: '',
    telefono: undefined
  };

  constructor(private router: Router, private servicioPedido: PedidoService) { }

  ngOnInit() {
    this.servicio = this.servicioPedido.getServicio();
  }
  ionViewWillEnter() {
    this.servicio = this.servicioPedido.getServicio();
  }

  async realizarPago() {
    if (!this.detalleContratacion.direccion) {
      console.error('Todos los campos son obligatorios');
      return;
    }
    try {
      await this.servicioPedido.realizarPago(this.detalleContratacion);
      console.log('Pago realizado con éxito');
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error('Error realizando el pago', error);
    }
  }

}
