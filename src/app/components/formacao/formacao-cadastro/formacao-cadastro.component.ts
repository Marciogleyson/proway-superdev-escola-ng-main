import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { FormacaoCadastro } from '../../../models/formacao-cadastro';
import { FormacaoService } from '../../../services/formacao.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-formacao-cadastro',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    DatePickerModule,
    TextareaModule,
  ],
  providers: [MessageService],
  templateUrl: './formacao-cadastro.component.html',
  styleUrl: './formacao-cadastro.component.css'
})
export class FormacaoCadastroComponent {
  formacao: FormacaoCadastro;

  constructor(
    private router: Router,
    private formacaoService: FormacaoService,
    private messageService: MessageService, 
  ){
    this.formacao = new FormacaoCadastro();
  }

  cadastrar() {
    this.formacaoService.cadastrar(this.formacao).subscribe({
      next: formacao => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar a formação" + erro),
    })
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Formação cadastrada com sucesso'});
    this.router.navigate(["/formacao"]);
  }
}
