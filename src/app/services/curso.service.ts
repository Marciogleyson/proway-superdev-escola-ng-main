import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoCadastro } from '../models/curso-cadastro';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { CursoEditar } from '../models/curso-editar';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlAPI: string;

  constructor(private http: HttpClient) {
    this.urlAPI = "http://localhost:8000/api/cursos";
   }

   cadastrar(cursoCadastro: CursoCadastro): Observable<Curso>{
    return this.http.post<Curso>(this.urlAPI, cursoCadastro);
   }
   obterTodos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.urlAPI);
   }
   obterPorId(id: number): Observable<Curso>{
    return this.http.get<Curso>(`${this.urlAPI}/${id}`);
   }
   apagar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
   }
   editar(id: number, cursoEditar: CursoEditar):Observable<Curso>{
    return this.http.put<Curso>(`${this.urlAPI}/${id}`, cursoEditar);
   }
}
