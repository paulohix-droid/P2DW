import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './busca.html',
  styleUrls: ['./busca.css']
})
export class BuscaComponent implements OnInit {
  termoBuscado: string = '';
  produtosFiltrados: Produto[] = [];
  carregando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.termoBuscado = params['q'];
        this.executarBusca();
      } else {
        this.listarTodos();
      }
    });
  }

  executarBusca(): void {
    this.carregando = true;
    this.produtoService.fazerBusca(this.termoBuscado).subscribe({
      next: (dados) => {
        this.produtosFiltrados = dados;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  listarTodos(): void {
    this.carregando = true;
    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtosFiltrados = dados;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    if (typeof window !== 'undefined') {
      const cestaStr = localStorage.getItem('cesta');
      const cesta = cestaStr ? JSON.parse(cestaStr) : [];
      cesta.push(produto);
      localStorage.setItem('cesta', JSON.stringify(cesta));
      alert(`"${produto.nome}" adicionado à cesta!`);
    }
  }
}
