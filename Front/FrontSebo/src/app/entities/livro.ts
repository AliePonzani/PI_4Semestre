import { Genero } from "./genero"

export interface Livro{
    id_livro?: number,
    titulo: String,
    genero: Genero,
    qtd: number,
    valor: number
}