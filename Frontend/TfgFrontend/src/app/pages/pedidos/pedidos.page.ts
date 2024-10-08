import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/modelos/pedido/pedido';
import { PedidoService } from 'src/app/clases/servicios/pedido/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }


  ngOnInit() {
    this.cargarPedidos();
  }

  ionViewWillEnter() {
    this.cargarPedidos();
  }


  async cargarPedidos() {
    this.pedidos = await this.pedidoService.getPedidosUsuario();
  }

}
