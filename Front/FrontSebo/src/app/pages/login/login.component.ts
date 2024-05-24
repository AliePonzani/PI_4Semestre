import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  valor: string = "";
  valor2: string = "botão buscar não foi pressionado";
  cont = 0;

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      usuario: new FormControl(''),
      senha: new FormControl('')
    });
  }

  onSubmit() {
    const usuario = this.loginForm.value.usuario;
    const senha = this.loginForm.value.senha;

    if (usuario === "teste" && senha === "12345") {
      this.router.navigate(['/home']);
    } else {
      this.valor = "Usuário ou senha inválidos!!!";
    }
  }
}
