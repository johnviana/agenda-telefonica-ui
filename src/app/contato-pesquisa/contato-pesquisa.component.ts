import { Component, OnInit } from '@angular/core';
import { ContatoService } from './contato.service';
// import { Contato } from '../core/model';


interface Contato {
  id: number,
  nome: string,
  email: string
  celuar: string,
  telefone: string

}
@Component({
  selector: 'app-contato-pesquisa',
  templateUrl: './contato-pesquisa.component.html',
  styleUrls: ['./contato-pesquisa.component.css']
})
export class ContatoPesquisaComponent implements OnInit{

  // contato = new Contato();

  nome: string = '';


  lancamentos = [] ;

  constructor(private contatoService: ContatoService){}

  ngOnInit(): void {
      this.pesquisar();
  }

  pesquisar(): void {
    this.contatoService.pesquisar({nome: this.nome })
      .then(lancamentos => this.lancamentos = lancamentos);
  }

  excluir(id: number) {
    this.contatoService.excluir(id)
      .then(() => {
      alert('Contato excluída com sucesso!');
      this.pesquisar();
    });
  }

  atualizar(contato: any){
    this.contatoService.atualizar(contato)
    .then(() => {
      alert('Contato alterado com sucesso');
    });
  }

  alternarStatus(contato: any): void {
    const novoStatus = !contato.ativo;

    this.contatoService.mudarStatus(contato.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        contato.ativo = novoStatus;

      })
      .catch(Error);
  }

  alternarFavorito(contato: any): void {
    const novoStatus = !contato.favorito;

    this.contatoService.mudarFavorito(contato.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        contato.favorito = novoStatus;

      })
      .catch(Error);
  }

}
