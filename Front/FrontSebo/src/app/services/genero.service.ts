import { Observable } from "rxjs/internal/Observable";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Genero } from "../entities/genero";

@Injectable({
    providedIn: 'root'
})

export class GeneroService{
    baseUrl = environment.baseUrlGenero;
    constructor(private http: HttpClient){ }
    buscarGeneros() : Observable<Genero[]>{
        return this.http.get<Genero[]>(this.baseUrl);
    }
}