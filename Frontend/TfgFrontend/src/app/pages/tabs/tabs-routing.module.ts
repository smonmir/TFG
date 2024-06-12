import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guard/auth/auth.guard';
import { RoleGuard } from 'src/app/guard/role/role.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then( m => m.PedidosPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'comprador' } //Solo accesible para compradores
      },
      {
        path: 'mis-servicios',
        loadChildren: () => import('../mis-servicios/mis-servicios.module').then( m => m.MisServiciosPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'vendedor' } //Solo accesible para vendedores
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
      },
      {
        path: 'detalle-servicio',
        loadChildren: () => import('../detalle-servicio/detalle-servicio.module').then( m => m.DetalleServicioPageModule)
      },
      {
        path: 'pago',
        loadChildren: () => import('../pago/pago.module').then( m => m.PagoPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'comprador' } //Solo accesible para compradores
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
