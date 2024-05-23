import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Livro } from '../../entities/livro';
import { Genero } from '../../entities/genero';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{
  @Output() searchEvent = new EventEmitter<string>();

  generos: Genero[] = [{nome:"terror"}] 
  genero: Genero = this.generos[0]
  livro: Livro[] = []
  filtroLivros: Livro[] = [];
  sectionVisible = false


  constructor(private service: LivroService, public dialog: MatDialog) {
    this.filtroLivros = this.livro;
  }

 ngOnInit(): void {
     this.buscarLivros();
 }

  buscarLivros(): void {
    this.service.buscarLivros().subscribe((resposta: Livro[]) => {
      this.livro = resposta;
      console.log("retorno da api ", resposta);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  visible(visible: boolean) {
    this.sectionVisible = visible
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.filtroLivros = this.livro.filter(item =>
      item.titulo.toLowerCase().includes(value.toLowerCase())
    );
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class DialogContentExampleDialog {}




// {
//   titulo: "Livro 1",
//   qtd: 10,
//   genero: this.genero,
//   valor: 20.00
// },
// {
//   titulo: "Livro 2",
//   qtd: 10,
//   genero: this.genero,
//   valor: 20.00
// },
// {
//   titulo: "Livro 3",
//   qtd: 10,
//   genero: this.genero,
//   valor: 20.00
// }
