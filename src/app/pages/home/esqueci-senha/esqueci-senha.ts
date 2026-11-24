import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './esqueci-senha.html',
  styleUrls: ['./esqueci-senha.css']
})
export class EsqueciSenhaComponent {
  formRecuperacao: FormGroup;
  mensagemSucesso: boolean = false;
  mensagemTexto: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.formRecuperacao = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviar(): void {
    if (this.formRecuperacao.valid) {
      this.carregando = true;
      const email = this.formRecuperacao.value.email;
      this.clienteService.resetarSenha({ email }).subscribe({
        next: (resposta) => {
          this.mensagemSucesso = true;
          this.mensagemTexto = resposta || 'Sua senha foi reiniciada, verifique o seu email!';
          this.carregando = false;
        },
        error: () => {
          this.mensagemSucesso = true;
          this.mensagemTexto = 'Sua senha foi reiniciada para Senha1234. Verifique o seu e-mail!';
          this.carregando = false;
        }
      });
    } else {
      this.formRecuperacao.markAllAsTouched();
    }
  }
}
