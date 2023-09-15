import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ContatoPesquisaComponent } from './contato-pesquisa/contato-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContatoCadastroComponent } from './contato/contato-cadastro/contato-cadastro.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ContatoService } from './contato-pesquisa/contato.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


const routes: Routes = [
  {path: 'contatos', component: ContatoPesquisaComponent},
  { path: 'contatos/:id', component: ContatoCadastroComponent },
  {path: 'contatos/cadastro', component: ContatoCadastroComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContatoPesquisaComponent,
    NavbarComponent,
    ContatoCadastroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ToastModule



  ],
  providers: [ContatoService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
