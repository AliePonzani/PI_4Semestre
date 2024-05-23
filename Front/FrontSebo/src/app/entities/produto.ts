import { Genero } from "./genero"

export interface Produto{
    id?: number,
    titulo: String,
    genero: Genero,
    qtd: number,
    valor: number
}