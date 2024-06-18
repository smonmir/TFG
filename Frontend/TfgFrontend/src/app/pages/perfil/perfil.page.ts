import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/modelos/usuario/usuario';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario!: Usuario;

  constructor(private router: Router, private usuarioService: UsuarioService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  ionViewWillEnter() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async editarCampo(campo: string, valor: string) {
    const alert = await this.alertController.create({
      header: `Editar ${campo}`,
      inputs: [
        {
          name: campo,
          type: campo === 'contraseña' ? 'password' : 'text',
          value: valor,
          placeholder: `Nuevo ${campo}`
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Guardar',
          handler: async (data) => {
            const nuevoValor = data[campo];
            if (nuevoValor) {
              if (campo === 'telefono' && nuevoValor.length !== 9) {
                this.presentToast('El número de teléfono debe tener 9 caracteres');
              }
              else{
                try {
                  await this.usuarioService.actualizarUsuario({ [campo]: nuevoValor });
                  this.presentToast(`${campo} actualizado correctamente`);
                } 
                catch (error: any) {
                  console.error(`Error al actualizar ${campo}:`, error);
                  if (error.status === 400) {
                    this.presentToast(error.error.message);
                  } else {
                    this.presentToast(`Error al actualizar ${campo}`);
                  }
                }
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  logout(){
    this.usuarioService.logout();
    this.router.navigate(['tabs/home']);
  }

}
