import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Formacao } from '../../../models/formacao';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormacaoService } from '../../../services/formacao.service';

@Component({
  selector: 'app-formacao-lista',
  imports: [TableModule, CommonModule, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './formacao-lista.component.html',
  styleUrl: './formacao-lista.component.css',
  providers: [MessageService, ConfirmationService]
})
export class FormacaoListaComponent implements OnInit {
  formacao: Array<Formacao>;
  carregandoFormacoes?: boolean;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formacaoService: FormacaoService,
  ) {
    this.formacao = []
  }
  ngOnInit(): void {
    this.carregarFormacoes();
  }

  private carregarFormacoes() {
    this.carregandoFormacoes = true;
    this.formacaoService.obterTodos().subscribe({
      next: formacoes => this.formacao = formacoes,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de formações:" + erro),
      complete:() => this.carregandoFormacoes = false
    });    
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/formacao/cadastro"])
  }

  redirecionarEditar(idFormacao: number) {
    this.router.navigate(["/formacao/editar/" + idFormacao])
  }

  confirmarParaApagar(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'Cuidado',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
        severity: 'danger'
      },
      accept: () => this.apagar(id)
    });
  }

  private apagar(id: number) {
    this.formacaoService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar o curso: ${erro}`),
    })
  }

  private apresentarMensagemApagado() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Formação removida com sucesso',
    });
    this.carregarFormacoes
  }
}