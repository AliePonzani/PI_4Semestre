import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genero } from '../../entities/genero';
import { Livro } from '../../entities/livro';
import { GeneroService } from '../../services/genero.service';
import { LivroService } from '../../services/livro.service';
import { MatButtonModule } from '@angular/material/button';
import { log } from 'node:console';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, SharedModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  titulo: String = ''
  selectFormControl = new FormControl('', Validators.required);
  valor: number = 0.00;
  qtd: number = 0;
  generos: Genero[] = []
  genero: number = 0;
  livro: Livro[] = []
  livroSelecionado: Livro[] = []

  constructor(private serviceGenero: GeneroService, private serviceLivro: LivroService) {
  }

  ngOnInit(): void {
    console.log("No modal recebeu",this.livroSelecionado);
    
    this.buscarGeneros();
  }

  buscarGeneros(): void {
    this.serviceGenero.buscarGeneros().subscribe((resposta: Genero[]) => {
      this.generos = resposta;
    });
  }

  

  salvarLivro(titulo: string, valor: number, qtd: number): void {
    this.livro = [{
      titulo: titulo,
      genero: {
        id_genero: Number(this.selectFormControl.value)
      },
      valor: valor,
      qtd: qtd
    }]    

    this.serviceLivro.salvarLivro(this.livro[0]).subscribe((resposta: Livro) => {
      this.serviceLivro.message("Livro cadastrado!");
    }, err => {
      this.serviceLivro.message(err);
    })
  }

}