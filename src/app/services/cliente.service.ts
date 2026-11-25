import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly baseUrl = '/api/cliente';

  constructor(private http: HttpClient) {}

  // GET /api/cliente/{codigo}
  retornaCliente(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${codigo}`);
  }

  // POST /api/cliente
  gravar(cliente: Cliente): Observable<string> {
    return this.http.post(this.baseUrl, cliente, { responseType: 'text' });
  }

  // PUT /api/cliente
  alterar(cliente: Cliente): Observable<string> {
    return this.http.put(this.baseUrl, cliente, { responseType: 'text' });
  }

  // DELETE /api/cliente/{codigo}
  excluir(codigo: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${codigo}`, { responseType: 'text' });
  }

  // POST /api/cliente/login
  fazerLogin(credenciais: { email: string; senha: string }): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/login`, credenciais);
  }

  // PATCH /api/cliente/resetarSenha
  resetarSenha(dados: { email: string }): Observable<string> {
    return this.http.patch(`${this.baseUrl}/resetarSenha`, dados, { responseType: 'text' });
  }

  // PATCH /api/cliente/alterarSenha
  alterarSenha(dados: { email: string; documento: string; senha: string }): Observable<string> {
    return this.http.patch(`${this.baseUrl}/alterarSenha`, dados, { responseType: 'text' });
  }
}