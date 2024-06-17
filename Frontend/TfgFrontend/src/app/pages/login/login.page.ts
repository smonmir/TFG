import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/clases/servicios/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin!: FormGroup;
  
  constructor(private router:Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    });
  }


  async logueo(): Promise<void>{
    try{
      if(this.formularioLogin.valid){
        await this.usuarioService.login(this.formularioLogin.value.email, this.formularioLogin.value.contrasena)
        this.router.navigate(['/tabs/home']);
      }
    }
    catch(error){
      console.log("error al iniciar sesion: " + error);
    }
  }

  registro(): void{
    this.router.navigate(["/tabs/registro"]);
  }

}
