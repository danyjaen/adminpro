import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../pages/models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(private usuarioService: UsuarioService, public router: Router) {}

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.forma.setValue({
      nombre: 'Daniel',
      correo: 'test@test.com',
      password: '1234',
      password2: '1234',
      condiciones: true
    });
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }
  registraUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      console.log('Debe aceptar las condiciones');
      //swal('Error!', 'Tienes que aceptar las condiciones!', 'warning');
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    this.usuarioService.crearUsuario(usuario).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }
}
