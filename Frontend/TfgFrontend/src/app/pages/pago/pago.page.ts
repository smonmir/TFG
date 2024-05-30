import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/clases/modelos/servicio/servicio';
import { PagoServiceService } from 'src/app/clases/servicios/pago/pago-service.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  servicio!: Servicio;

  paymentDetails = {
    serviceId: '',
    amount: 0,
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };

  constructor(private router: Router, private servicioPago: PagoServiceService) { }

  ngOnInit() {
    this.servicio = this.servicioPago.getServicio();
  }

  async realizarPago() {
    await this.servicioPago.realizarPago()
      .then(data => {
        console.log('Pago realizado con éxito', data);
        this.router.navigate(['/tabs/home']);
      })
      .catch(error => {
        console.error('Error realizando el pago', error);
      });
  }

}
