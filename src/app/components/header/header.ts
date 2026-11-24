import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  clienteLogado: Cliente | null = null;
  mensagemLogin = '';
  mensagemCadastro = '';

  // Modelos para formulários
  loginForm = {
    email: '',
    senha: ''
  };

  cadastroForm: Cliente = new Cliente();

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('cliente');
      if (salvo) {
        try {
          this.clienteLogado = JSON.parse(salvo);
        } catch {
          this.clienteLogado = null;
        }
      }
    }
  }

  fazerBusca(termo: string): void {
    if (termo.trim()) {
      this.router.navigate(['/busca'], { queryParams: { q: termo.trim() } });
    }
  }

  realizarLogin(): void {
    this.mensagemLogin = '';
    this.clienteService.fazerLogin(this.loginForm).subscribe({
      next: (cliente) => {
        if (cliente && cliente.codigo) {
          this.clienteLogado = cliente;
          if (typeof window !== 'undefined') {
            localStorage.setItem('cliente', JSON.stringify(cliente));
          }
          this.mensagemLogin = `Bem-vindo(a), ${cliente.nome}!`;
        } else {
          this.mensagemLogin = 'E-mail ou senha inválidos!';
        }
      },
      error: () => {
        this.mensagemLogin = 'Erro ao conectar ao servidor.';
      }
    });
  }

  realizarCadastro(): void {
    this.mensagemCadastro = '';
    this.clienteService.gravar(this.cadastroForm).subscribe({
      next: (res) => {
        this.mensagemCadastro = res || 'Cliente gravado com sucesso!';
        this.cadastroForm = new Cliente();
      },
      error: () => {
        this.mensagemCadastro = 'Erro ao realizar cadastro.';
      }
    });
  }

  logout(): void {
    this.clienteLogado = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cliente');
    }
  }
}
