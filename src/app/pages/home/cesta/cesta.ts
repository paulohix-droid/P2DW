import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido, ItemPedido } from '../../../models/pedido.model';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cesta.html',
  styleUrls: ['./cesta.css']
})
export class CestaComponent implements OnInit {
  itens: Produto[] = [];
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('cesta');
      if (salvo) {
        try {
          this.itens = JSON.parse(salvo);
        } catch {
          this.itens = [];
        }
      }
      if (!this.itens || this.itens.length === 0) {
        // Itens iniciais de demonstração
        this.itens = [
          {
            codigo: 1,
            nome: 'Gibson Sammy Hagar Explorer',
            descricao: 'Gibson Sammy Hagar Explorer',
            valor: 9800.00,
            imagem: '/Gibson Sammy Hagar Explorer.jpg',
            quantidade: 1
          },
          {
            codigo: 3,
            nome: 'Fender Custom Telecaster Sunburst (2000)',
            descricao: 'Fender Custom Telecaster Sunburst',
            valor: 7500.00,
            imagem: '/2000 Fender Custom Telecaster Sunburst.jpg',
            quantidade: 1
          }
        ];
      }
    }
  }

  removerItem(index: number): void {
    this.itens.splice(index, 1);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cesta', JSON.stringify(this.itens));
    }
  }

  limparCesta(): void {
    this.itens = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cesta');
    }
    this.mensagemSucesso = '';
  }

  calcularTotal(): number {
    return this.itens.reduce((acc, curr) => acc + (curr.valor || 0), 0);
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) {
      alert('Sua cesta está vazia!');
      return;
    }

    const clienteLogadoStr = typeof window !== 'undefined' ? localStorage.getItem('cliente') : null;
    let clienteId = 1;
    if (clienteLogadoStr) {
      try {
        const cliente = JSON.parse(clienteLogadoStr);
        clienteId = cliente.codigo || 1;
      } catch {}
    }

    const itensPedido: ItemPedido[] = this.itens.map((p, idx) => ({
      codigoItemPedido: idx + 1,
      codigoProduto: p.codigo,
      quantidade: 1,
      valor: p.valor
    }));

    const novoPedido: Pedido = {
      codigoPedido: 0,
      codigoCliente: clienteId,
      valorTotal: this.calcularTotal(),
      entrega: 'Padrão',
      obs: 'Pedido realizado via site',
      dataPedido: new Date().toISOString().slice(0, 10),
      itens: itensPedido
    };

    this.pedidoService.gravar(novoPedido).subscribe({
      next: (resposta) => {
        this.mensagemSucesso = resposta || 'Pedido gravado com sucesso!';
        this.limparCesta();
        alert('Pedido finalizado com sucesso! ' + this.mensagemSucesso);
      },
      error: () => {
        this.mensagemErro = 'Erro ao processar pedido no servidor.';
      }
    });
  }
}
