import { Routes } from '@angular/router';
import { CursosListaComponent } from './components/cursos/cursos-lista/cursos-lista.component';
import { CursoCadastroComponent } from './components/cursos/curso-cadastro/curso-cadastro.component';
import { CursoEditarComponent } from './components/cursos/curso-editar/curso-editar.component';
import { AlunosListaComponent } from './components/alunos/alunos-lista/alunos-lista.component';
import { FormacaoListaComponent } from './components/formacao/formacao-lista/formacao-lista.component';
import { FormacaoCadastroComponent } from './components/formacao/formacao-cadastro/formacao-cadastro.component';
import { FormacaoEditarComponent } from './components/formacao/formacao-editar/formacao-editar.component';

export const routes: Routes = [
    {path: "cursos", component: CursosListaComponent},
    {path: "cursos/cadastro", component: CursoCadastroComponent},
    {path: "cursos/editar/:id", component: CursoEditarComponent},
    {path: "alunos", component: AlunosListaComponent},
    {path: "alunos/lista", component: AlunosListaComponent},
    {path: "formacao", component: FormacaoListaComponent},
    {path: "formacao/cadastro", component: FormacaoCadastroComponent},
    {path: "formacao/editar/:id", component: FormacaoEditarComponent},
];
