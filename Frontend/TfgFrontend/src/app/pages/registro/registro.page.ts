import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro!: FormGroup;
  
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.formularioRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]) // Agregamos el control para el rol
    });
  }

  async registro(): Promise<void> {
    if (this.formularioRegistro.valid) {
      try {
        const { nombre, email, contrasena, rol } = this.formularioRegistro.value;
        await this.usuarioService.registro(nombre, email, contrasena, rol);
        this.router.navigate(['/tabs/login']);
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  }

  cancelar() {
    this.router.navigate(['']);
  }
}
