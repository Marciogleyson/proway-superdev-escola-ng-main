import { Component } from '@angular/core';
import { FormacaoEditar } from '../../../models/formacao-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormacaoService } from '../../../services/formacao.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Formacao } from '../../../models/formacao';

@Component({
  selector: 'app-formacao-editar',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './formacao-editar.component.html',
  styleUrl: './formacao-editar.component.css'
})
export class FormacaoEditarComponent {
formacao: FormacaoEditar ;
  idEditar: number;

  constructor(
    private router: Router,
    private formacaoService: FormacaoService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
  ) {
    this.formacao = new FormacaoEditar();
    this.idEditar = parseInt(this.activateRoute.snapshot.paramMap.get("id")!.toString());
  }

  ngOnInit(){
    this.formacaoService.obterporId(this.idEditar).subscribe({
      next: formacao => this.preencherCamposParaEditar(formacao),
      error: erro => console.log("Ocorreu ao carregar os dados do curso" + erro),
    });
  }

  private preencherCamposParaEditar(formacao: Formacao){
    this.formacao.nome = formacao.nome;
    this.formacao.descricao = formacao.descricao;
    this.formacao.duracao = formacao.duracao;
  }

  editar() {
    this.formacaoService.editar(this.idEditar, this.formacao).subscribe({
      next: formacao => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar a formação:" + erro),
    })
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Curso alterado com sucesso'});
    this.router.navigate(["/formacao"]);
  }
}
