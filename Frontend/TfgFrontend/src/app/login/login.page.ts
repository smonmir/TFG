import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../clases/servicios/login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin!: FormGroup;
  
  constructor(private router:Router, private loginService: LoginService) { }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    });
  }


  logueo(): void{
    if(this.formularioLogin.valid){
      
    }
  }

  registro(): void{
    this.router.navigate(["registro"]);
  }

}
