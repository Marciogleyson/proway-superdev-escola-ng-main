import { Component } from '@angular/core';
import { CursoEditar } from '../../../models/curso-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Curso } from '../../../models/curso';
import { Matricula, MatriculaCadastrar } from '../../../models/matricula';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AlunoSelect } from '../../../models/aluno';
import { SelectModule } from 'primeng/select';
import { AlunoService } from '../../../services/aluno.service';
import { MatriculaService } from '../../../services/matricula.service';

@Component({
  selector: 'app-curso-editar',
  imports: [ 
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    SelectModule,
  ],
  providers: [MessageService],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.css'
})
export class CursoEditarComponent {
curso: CursoEditar;
  idEditar: number;
  matriculaCadastrar: MatriculaCadastrar;
  modalCadastrarVisible: boolean;
  matriculas: Matricula[];
  alunos: AlunoSelect[];

  constructor(
    private matriculaService: MatriculaService,
    private alunoService: AlunoService,
    private router: Router,
    private cursoService: CursoService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ){
    this.curso = new CursoEditar();
    this.idEditar = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    this.matriculaCadastrar = new MatriculaCadastrar();
    this.modalCadastrarVisible = false;
    this.matriculas = [];
    this.alunos = [];
  }

  ngOnInit(){
    this.cursoService.obterporId(this.idEditar).subscribe({
      next: curso => this.preencherCamposParaEditar(curso),
      error: erro => console.log("Ocorreu ao carregar os dados do curso" + erro),
    });
    this.carregarMatriculas();
  }

  private preencherCamposParaEditar(curso: Curso){
    this.curso.nome = curso.nome;
    this.curso.sigla = curso.sigla;
  }

  editar() {
    this.cursoService.editar(this.idEditar, this.curso).subscribe({
      next: curso => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o curso:" + erro),      
    })
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Curso alterado com sucesso'});
    this.router.navigate(["/cursos"]);
  }
  abrirModalRegistrarMatricula(){
    this.carregarAlunos();
    this.modalCadastrarVisible = true
  }

  matricular(){

  }
  private carregarAlunos(){
    this.alunoService.obterTodos().subscribe({
      next: alunos => this.alunos = alunos.map(aluno => new AlunoSelect(
        `${aluno.nome} ${aluno.sobrenome} - ${aluno.cpf}`, aluno.id!
      )).sort((a,b) => a.nomeCompleto.localeCompare(b.nomeCompleto)),
      error: erro => this.apresentarMensagemErroCarregarAlunos(erro)
    })
  }
  apresentarMensagemErroCarregarAlunos(error: any){
    this.messageService.add({detail: "Erro ao carregar os alunos", severity: "erro"});
    console.error(error)
  }

  carregarMatriculas(){
    this.matriculaService.obterTodos(this.idEditar).subscribe({
      next: matriculas => this.matriculas = matriculas,
      error: erro => this.apresentarMensagemErroCarregarMatriculas(erro)
    })
  }

  apresentarMensagemErroCarregarMatriculas(error: any){
    this.messageService.add({detail: "Erro ao carregar as matriculas", severity: "error"});
    console.error(error);
  }
}


