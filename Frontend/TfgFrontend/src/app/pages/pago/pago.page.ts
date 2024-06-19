import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  pagoForm!: FormGroup;

  constructor(private router: Router, private servicioPedido: PedidoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.servicio = this.servicioPedido.getServicio();
    this.pagoForm = this.formBuilder.group({
      direccion: ['', Validators.required],
      telefono: ['', [Validators.pattern('^[0-9]{9}$')]]
    });
  }

  ionViewWillEnter() {
    this.servicio = this.servicioPedido.getServicio();
  }

  async realizarPago() {
    if (this.pagoForm.invalid) {
      console.error('Todos los campos son obligatorios y el teléfono debe tener 9 caracteres si se proporciona.');
      return;
    }
    try {
      await this.servicioPedido.realizarPago(this.pagoForm.value);
      console.log('Pago realizado con éxito');
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error('Error realizando el pago', error);
    }
  }

  onReturn(){
    this.router.navigate(['/tabs/detalle-servicio']);
  }
}