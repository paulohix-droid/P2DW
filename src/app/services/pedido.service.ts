import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly baseUrl = 'http://localhost:8080/api/pedido';

  constructor(private http: HttpClient) {}

  // GET /api/pedido/{codigo}
  retornaPedido(codigo: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${codigo}`);
  }

  // POST /api/pedido
  gravar(pedido: Pedido): Observable<string> {
    return this.http.post(this.baseUrl, { codigoPedido: pedido.codigoPedido }, { responseType: 'text' });
  }

  // PUT /api/pedido
  alterar(pedido: Pedido): Observable<string> {
    return this.http.put(this.baseUrl, { codigoPedido: pedido.codigoPedido }, { responseType: 'text' });
  }

  // DELETE /api/pedido/{codigo}
  excluir(codigo: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${codigo}`, { responseType: 'text' });
  }
}