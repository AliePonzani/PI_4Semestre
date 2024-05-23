import { Observable } from "rxjs/internal/Observable";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Produto } from "../entities/produto";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient){ }
    buscarLivros() : Observable<Produto[]>{
        return this.http.get<Produto[]>(this.baseUrl);
    }
}