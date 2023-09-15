import { Component, OnInit } from '@angular/core';
import { ContatoService } from './contato-pesquisa/contato.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

nome: string = '';

contatos = []

constructor(private contatoService: ContatoService){}

ngOnInit(): void {
  this.contatoService.pesquisar({nome: this.nome})
  .then(dados => this.contatos = dados);
}

}
