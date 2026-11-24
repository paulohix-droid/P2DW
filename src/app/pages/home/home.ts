import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  produtosVitrine: Produto[] = [
    {
      codigo: 1,
      nome: 'Gibson Sammy Hagar Explorer',
      descricao: 'Gibson Sammy Hagar Explorer - Vermelha',
      valor: 9800.00,
      imagem: '/Gibson Sammy Hagar Explorer.jpg',
      marca: 'Gibson'
    },
    {
      codigo: 2,
      nome: "Fender Stratocaster 'Black Strat'",
      descricao: "Fender Stratocaster 'Black Strat' - David Gilmour",
      valor: 15000.00,
      imagem: "/David Gilmour’s Guitar Collection sells for $21_5 million at Christie’s.jpg",
      marca: 'Fender'
    },
    {
      codigo: 3,
      nome: 'Fender Custom Telecaster Sunburst (2000)',
      descricao: 'Fender Custom Telecaster Sunburst (2000)',
      valor: 7500.00,
      imagem: '/2000 Fender Custom Telecaster Sunburst.jpg',
      marca: 'Fender'
    },
    {
      codigo: 4,
      nome: 'Fender CD-140SCE All Mahogany',
      descricao: 'Fender CD-140SCE All Mahogany',
      valor: 6200.00,
      imagem: '/Amazon_com_ Fender CD-140SCE Acoustic_Electric Guitar (All Mahogany), Natural_ Musical Instruments.jpg',
      marca: 'Acústicas'
    }
  ];

  carregando = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregando = true;
    this.produtoService.carregaVitrine().subscribe({
      next: (dados) => {
        if (dados && dados.length > 0) {
          this.produtosVitrine = dados;
        }
        this.carregando = false;
      },
      error: () => {
        // Mantém a lista padrão caso o backend esteja em inicialização
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
