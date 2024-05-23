import { Observable } from "rxjs/internal/Observable";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Livro } from "../entities/livro";

@Injectable({
    providedIn: 'root'
})
export class LivroService{
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient){ }
    buscarLivros() : Observable<Livro[]>{
        return this.http.get<Livro[]>(this.baseUrl);
    }
}