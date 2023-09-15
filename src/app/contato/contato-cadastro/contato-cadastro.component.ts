import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContatoService } from 'src/app/contato-pesquisa/contato.service';
import { Contato } from 'src/app/core/model';

interface Contatos {
  id: number,
  nome: string,
  email: string
  celuar: string,
  telefone: string

}


@Component({
  selector: 'app-contato-cadastro',
  templateUrl: './contato-cadastro.component.html',
  styleUrls: ['./contato-cadastro.component.css']
})
export class ContatoCadastroComponent implements OnInit {


  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute
    ) { }

  nome: string ='';
  // lancamentos = []
  contato = new Contato();

  contatos: Contato[] = [];


  ngOnInit(): void {

    const codigoContato = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);


    if (codigoContato && codigoContato !== 'novo') {
      this.carregarLancamento(codigoContato)
    }
    this.carregarContatos()

  }
  carregarLancamento(id: number) {
    this.contatoService.buscarPorCodigo(id)
      .then(contato => {
        this.contato = contato;
      },
        erro => (erro));
  }

  get editando(){
    return Boolean(this.contato.id)
  }

  carregarContatos() {
    this.contatoService.listarTodas()
      .then(contatos => {
        this.contatos = contatos
          .map((p: any) => ({ label: p.nome, value: p.id }));
      })
      .catch(Error);
  }
  pesquisar(){
    this.contatoService.pesquisar({nome: this.nome})
      .then(contato => this.contatos = contato);
  }

  salvar(form: NgForm){
    if(this.editando){
      this.atualizarContato(form);
      } else {
        this.adicionarContato(form);
      }
  }

  adicionarContato(form: NgForm) {
    this.contatoService.adicionar(this.contato)
      .then(() => {
        alert(`Contato "${this.contato.nome}" adicionado com Sucesso!`);
        form.reset();
        this.contato = new Contato();
      })
      .catch(Error);
  }
  atualizarContato(form: NgForm) {
    this.contatoService.atualizar(this.contato)
      .then((lancamento: Contato) => {
        this.contato = lancamento;
        alert(`Contato "${this.contato.nome}" Contato alterado com sucesso!`);
      }
      ).catch(Error)
  }

    // salvar() {
    //   this.contatoService.adicionar({ nome, email, celular, telefone })
    //     .then(contato => {
    //       alert(`Contato "${contato.nome}" adicionada com código ${contato.id}!`);
    //       this.pesquisar();
    //     })
    // }



}
