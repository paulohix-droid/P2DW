import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detalhe.html',
  styleUrls: ['./detalhe.css']
})
export class DetalheComponent implements OnInit {
  produtoAtual: Produto | null = null;
  carregando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const idBusca = params['id'];
      if (idBusca) {
        const codigoNum = parseInt(idBusca, 10);
        if (!isNaN(codigoNum)) {
          this.carregarProdutoPorCodigo(codigoNum);
          return;
        }
      }
      // Por padrão, carrega o produto de código 1
      this.carregarProdutoPorCodigo(1);
    });
  }

  carregarProdutoPorCodigo(codigo: number): void {
    this.carregando = true;
    this.produtoService.retornaProduto(codigo).subscribe({
      next: (produto) => {
        if (produto && produto.codigo) {
          this.produtoAtual = produto;
        } else {
          // Fallback para o primeiro produto
          this.produtoService.retornaProduto(1).subscribe((p) => {
            this.produtoAtual = p;
          });
        }
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  adicionarAoCarrinho(): void {
    if (this.produtoAtual && typeof window !== 'undefined') {
      const cestaStr = localStorage.getItem('cesta');
      const cesta = cestaStr ? JSON.parse(cestaStr) : [];
      cesta.push(this.produtoAtual);
      localStorage.setItem('cesta', JSON.stringify(cesta));
      alert(`"${this.produtoAtual.nome}" adicionado à cesta!`);
    }
  }
}
