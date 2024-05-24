import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Livro } from '../../entities/livro';
import { Genero } from '../../entities/genero';
import { LivroService } from '../../services/livro.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  generos: Genero[] = [{ nome: "terror" }]
  genero: Genero = this.generos[0]
  livro: Livro[] = []
  livroSelecionado: Livro[] = [];
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
      this.filtroLivros = this.livro
    });
  }

  openDialog(livroSelecionado?: Livro) {
    const dialogRef = this.dialog.open(ModalComponent,
      {
        data: {
          livroSelecionado: livroSelecionado
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.buscarLivros()
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

  dados(livro: Livro) {
    this.livroSelecionado[0] = livro;
    console.log(this.livroSelecionado);
    this.openDialog();
  }

  deletar(id:any):void{
    this.service.deletar(id).subscribe((resposta) =>{
      if(resposta == null){
        this.service.message("Livro removido com Sucesso");
        this.livro = this.livro.filter(livro => livro.id_livro != id);
        this.buscarLivros();
      }else{
        this.service.message("Livro não removido");
      }

    })
  }


}
