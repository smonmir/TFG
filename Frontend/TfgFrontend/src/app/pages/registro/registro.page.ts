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
  
  constructor(private router:Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.formularioRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    });
  }


  async registro(): Promise<void>{
    if(this.formularioRegistro.valid){
      try{
        await this.usuarioService.registro(this.formularioRegistro.value.nombre, this.formularioRegistro.value.email, this.formularioRegistro.value.contrasena)
        this.router.navigate(['/tabs/login']);
      }
      catch(error){
        console.error('Error en el registro:', error);
      }
    }
  }

  cancelar(){
    this.router.navigate(['']);
  }

}
