import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // 1. Buscar Produto por Código (GET /api/produto/{codigo})
  retornaProduto(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/produto/${codigo}`);
  }

  // 2. Cadastrar Produto (POST /api/produto)
  gravar(obj: Produto): Observable<string> {
    return this.http.post(`${this.baseUrl}/produto`, obj, { responseType: 'text' });
  }

  // 3. Alterar Produto (PUT /api/produto)
  alterar(obj: Produto): Observable<string> {
    return this.http.put(`${this.baseUrl}/produto`, obj, { responseType: 'text' });
  }

  // 4. Excluir Produto (DELETE /api/produto/{codigo})
  apagar(codigo: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/produto/${codigo}`, { responseType: 'text' });
  }

  // 5. Listar Todos os Produtos (GET /api/produtos)
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`);
  }

  // 6. Carregar Produtos da Vitrine (GET /api/produto/vitrine)
  carregaVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produto/vitrine`);
  }

  // 7. Buscar Produtos por Descrição (GET /api/produto/busca/{termo})
  fazerBusca(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produto/busca/${encodeURIComponent(termo)}`);
  }
}
