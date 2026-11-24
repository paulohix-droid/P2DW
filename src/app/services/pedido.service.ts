import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly baseUrl = '/api/pedido';

  constructor(private http: HttpClient) {}

  // 1. Buscar Pedido (GET /api/pedido/{codigo})
  retorna(codigo: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${codigo}`);
  }

  // 2. Cadastrar Pedido (POST /api/pedido)
  gravar(obj: Pedido): Observable<string> {
    return this.http.post(this.baseUrl, obj, { responseType: 'text' });
  }

  // 3. Alterar Pedido (PUT /api/pedido)
  alterar(obj: Pedido): Observable<string> {
    return this.http.put(this.baseUrl, obj, { responseType: 'text' });
  }

  // 4. Excluir Pedido (DELETE /api/pedido/{codigo})
  apagar(codigo: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${codigo}`, { responseType: 'text' });
  }
}
