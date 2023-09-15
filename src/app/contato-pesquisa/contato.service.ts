import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Injectable } from '@angular/core';
import { Contato } from '../core/model';

export interface contatoFiltro{
  nome: string;
}

export interface contatos{
  id: number,
  nome: string,
  email: string,
  celular: string,
  telefone: string
}


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  contatoUrl = 'http://localhost:8080/api/contatos/nome';

  constructor(private http: HttpClient) { }

    pesquisar(filtro: contatoFiltro): Promise<any> {
      let params = new HttpParams();

      if(filtro.nome){
        params = params.set('nome', filtro.nome);

      }

      return firstValueFrom(this.http.get(`${this.contatoUrl}?`, { params }))
  }

  adicionar(contato: Contato): Promise<Contato> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
      return firstValueFrom(this.http.post<Contato>(this.contatoUrl, contato, { headers }));

  }

  excluir(id: number): Promise<any>{
  return firstValueFrom(this.http.delete(`http://localhost:8080/api/contatos/${id}`))
    .then(() => null);
  }

  atualizar(contato: Contato): Promise<Contato> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<Contato>(`${this.contatoUrl}/${contato.id}`, contato, { headers }))
      .then((response: any) => {
        return response;
      });
  }


  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<void>(`${this.contatoUrl}/${codigo}/ativo`, ativo, { headers }))

  }
  mudarFavorito(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<void>(`${this.contatoUrl}/${codigo}/ativo/favorito`, ativo, { headers }))

  }

  buscarPorCodigo(id: number): Promise<Contato> {
    let params = new HttpParams();

    const headers = new HttpHeaders()

    return firstValueFrom(this.http.get(`http://localhost:8080/api/contatos/${id}`, { headers }))
      .then((response: any) => {
        return response;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
    return this.http.get(this.contatoUrl, { headers })
      .toPromise()
      .then((response: any) => response['content']);
  }

}

