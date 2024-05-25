import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { FormControl, Validators } from '@angular/forms';
import { Genero } from '../../entities/genero';
import { Livro } from '../../entities/livro';
import { GeneroService } from '../../services/genero.service';
import { LivroService } from '../../services/livro.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [SharedModule],
  providers: [ToastService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  selectFormControl = new FormControl(0, Validators.required);
  generos: Genero[] = []
  livro!: Livro;
  livroSelecionado!: Livro;
  tipo!: String;
  selectedGeneroId: string | number = '';


  transition = 'bounce';
  position = 'top-right';
  autoClose = 5000;
  disableAutoClose = false;
  hideProgress = false;
  newestOnTop = false;
  iconLibrary = 'material';
  preventDuplicates = false;
  closeOnClick = true;
  pauseDelayHover = true;
  pauseVisibilityChange = true;


  constructor(
    private serviceGenero: GeneroService,
    private serviceLivro: LivroService,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: { livroSelecionado: Livro },
    public dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.livroSelecionado = data.livroSelecionado;
  }

  ngOnInit(): void {
    if (this.livroSelecionado) {
      this.selectedGeneroId = Number(this.livroSelecionado.genero.id_genero);
      this.selectFormControl.setValue(this.selectedGeneroId);
      this.tipo = "Alterar"
    } else {
      this.tipo = "Salvar"
    }
    this.buscarGeneros();
  }

  buscarGeneros(): void {
    this.serviceGenero.buscarGeneros().subscribe((resposta: Genero[]) => {
      this.generos = resposta;
    });
  }

  onGeneroChange(newGeneroId: number): void {
    this.selectFormControl.setValue(newGeneroId);
  }

  salvarLivro(titulo: string, valor: number, qtd: number): void {
    this.livro = {
      ...this.livroSelecionado,
      titulo: titulo,
      genero: {
        id_genero: Number(this.selectFormControl.value)
      },
      valor: valor,
      qtd: qtd
    }

    if (!this.livroSelecionado) {
      this.serviceLivro.salvarLivro(this.livro).subscribe((resposta: Livro) => {
        this.serviceLivro.message("Livro cadastrado!");
        this.dialogRef.close("OK");
      }, err => {
        this.serviceLivro.message(err);
        this.dialogRef.close("ERROR");
      })
    } else {
      this.serviceLivro.atualizarLivro(this.livro).subscribe({
        next: (resposta) => {
          this.serviceLivro.message("Livro atualizado!");
          this.dialogRef.close("OK");
        },
        error: (err) => {
          this.serviceLivro.message("Erro ao atualizar livro!");
          this.dialogRef.close("ERROR");
        }
      });
      
    }
  }
}