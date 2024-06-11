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
  currentPage: number = 1;
  totalPages: number = 1;
  searchQuery: string = '';

  constructor(private router: Router, private servicioService: ServicioService) {}


  ngOnInit() {
    this.cargarServicios();
  }

  async cargarServicios() {
    try {
      const data = await this.servicioService.getServiciosPaginados(this.currentPage, 6, this.searchQuery);
      this.servicios = data.servicios;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
    } catch (error) {
      console.error('Error cargando servicios', error);
    }
  }

  async onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    this.currentPage = 1;  // Reset to the first page on search
    await this.cargarServicios();
  }

  async cargarPaginaSiguiente() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.cargarServicios();
    }
  }

  async cargarPaginaAnterior() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.cargarServicios();
    }
  }

  verDescripcionServicio(servicio: Servicio): void {
    this.servicioService.setServicio(servicio);
    this.router.navigate(['tabs/detalle-servicio']);
  }

}
