import { Component, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Produto } from '../../entities/produto';
import { Genero } from '../../entities/genero';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent {
  @Output() searchEvent = new EventEmitter<string>();


  generos: Genero[] = [{nome:"terror"}] 
  genero: Genero = this.generos[0]
  list: Produto[] = []
  filteredItems: Produto[] = [];
  sectionVisible = false


  constructor(private service: ProdutoService, public dialog: MatDialog) {
    this.filteredItems = this.list;
  }

  buscarLivros(): void {
    this.service.buscarLivros().subscribe((resposta: Produto[]) => {
      this.list = resposta;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  visible(visible: boolean) {
    this.sectionVisible = visible
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.filteredItems = this.list.filter(item =>
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
