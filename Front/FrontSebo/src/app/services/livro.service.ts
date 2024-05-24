import { Observable } from "rxjs/internal/Observable";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Livro } from "../entities/livro";

@Injectable({
    providedIn: 'root'
})
export class LivroService {
    baseUrl = environment.baseUrlLivro;

    constructor(private http: HttpClient) { }

    message(msg: string): void {
        console.log(msg);
    }

    buscarLivros(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.baseUrl);
    }

    salvarLivro(livro: Livro): Observable<Livro> {
        return this.http.post<Livro>(this.baseUrl, livro);
    }

    atualizarLivro(livro: Livro): Observable<Livro> {
        const url = `${this.baseUrl}/${livro.id_livro}`;
        return this.http.put<Livro>(url, livro);
    }


    deletar(id: any): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
      }


}
