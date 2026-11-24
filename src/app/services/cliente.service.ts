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

  // 1. Buscar Cliente por Código (GET /api/cliente/{codigo})
  retorna(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${codigo}`);
  }

  // 2. Cadastrar Cliente (POST /api/cliente)
  gravar(obj: Cliente): Observable<string> {
    return this.http.post(this.baseUrl, obj, { responseType: 'text' });
  }

  // 3. Alterar Cliente (PUT /api/cliente)
  alterar(obj: Cliente): Observable<string> {
    return this.http.put(this.baseUrl, obj, { responseType: 'text' });
  }

  // 4. Excluir Cliente (DELETE /api/cliente/{codigo})
  apagar(codigo: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${codigo}`, { responseType: 'text' });
  }

  // 5. Login do Cliente (POST /api/cliente/login)
  fazerLogin(credenciais: { email: string; senha: string }): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/login`, credenciais);
  }

  // 6. Resetar Senha (PATCH /api/cliente/resetarSenha)
  resetarSenha(obj: { email: string }): Observable<string> {
    return this.http.patch(`${this.baseUrl}/resetarSenha`, obj, { responseType: 'text' });
  }

  // 7. Alterar Senha (PATCH /api/cliente/alterarSenha)
  alterarSenha(obj: { email: string; documento?: string; senha: string }): Observable<string> {
    return this.http.patch(`${this.baseUrl}/alterarSenha`, obj, { responseType: 'text' });
  }
}
