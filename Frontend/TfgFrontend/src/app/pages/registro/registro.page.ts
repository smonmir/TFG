import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro!: FormGroup;
  codigoVerificacionForm!: FormGroup;
  mostrarCodigoVerificacion: boolean = false;
  datosRegistro: any = {};
  
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.formularioRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, this.telefonoValidator]),
      rol: new FormControl('', [Validators.required])
    });
    this.codigoVerificacionForm = new FormGroup({
      codigo: new FormControl('', [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.formularioRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, this.telefonoValidator]),
      rol: new FormControl('', [Validators.required])
    }); 
    this.codigoVerificacionForm = new FormGroup({
      codigo: new FormControl('', [Validators.required])
    });
  }


  private telefonoValidator(control: FormControl): ValidationErrors | null {
    const numTelefono = control.value;

    if (numTelefono.length != 9) {
      return { telLengthError: 'El número de teléfono debe tener 9 dígitos' };
    }
  
    for (let char of numTelefono) {
      if (isNaN(parseInt(char))) {
        return { telFormatError: 'El número de teléfono debe contener solo números' };
      }
    }
  
    return null;
  }

  /*
  async registro(): Promise<void> {
    if (this.formularioRegistro.valid) {
      try {
        const { nombre, email, contrasena, telefono, rol } = this.formularioRegistro.value;
        await this.usuarioService.registro(nombre, email, contrasena, telefono, rol);
        this.router.navigate(['/tabs/login']);
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  }
  */

  async enviarCodigoVerificacion(): Promise<void> {
    if (this.formularioRegistro.valid) {
      try {
        const { nombre, email, contrasena, telefono, rol } = this.formularioRegistro.value;
        this.datosRegistro = { nombre, email, contrasena, telefono, rol };
        await this.usuarioService.enviarCodigoVerificacion(email);
        this.mostrarCodigoVerificacion = true;
      } catch (error) {
        console.error('Error al enviar el código de verificación:', error);
      }
    }
  }

  async verificarCodigoYRegistrar(): Promise<void> {
    if (this.codigoVerificacionForm.valid) {
      try {
        const { codigo } = this.codigoVerificacionForm.value;
        await this.usuarioService.verificarCodigo(this.datosRegistro.email, codigo);
        await this.usuarioService.registro(this.datosRegistro);
        this.router.navigate(['/tabs/login']);
      } catch (error) {
        console.error('Error en la verificación del código o registro:', error);
      }
    }
  }

  cancelar() {
    this.router.navigate(['']);
  }
}
