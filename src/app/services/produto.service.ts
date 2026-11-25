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

  // GET /api/produto/{codigo}
  retornaProduto(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/produto/${codigo}`);
  }

  // POST /api/produto
  gravar(produto: Produto): Observable<string> {
    return this.http.post(`${this.baseUrl}/produto`, produto, { responseType: 'text' });
  }

  // PUT /api/produto
  alterar(produto: Produto): Observable<string> {
    return this.http.put(`${this.baseUrl}/produto`, produto, { responseType: 'text' });
  }

  // DELETE /api/produto/{codigo}
  excluir(codigo: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/produto/${codigo}`, { responseType: 'text' });
  }

  // GET /api/produtos
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`);
  }

  // GET /api/produto/vitrine
  carregaVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produto/vitrine`);
  }

  // GET /api/produto/busca/{termo}
  fazerBusca(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produto/busca/${termo}`);
  }
}