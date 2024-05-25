import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Livro } from '../../entities/livro';
import { LivroService } from '../../services/livro.service';
import { ModalComponent } from '../modal/modal.component';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  providers: [ToastService],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

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

  livro: Livro[] = []
  livroSelecionado: Livro[] = [];
  filtroLivros: Livro[] = [];
  sectionVisible = false

  constructor(private service: LivroService, public dialog: MatDialog, private _toastService: ToastService) {
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
      this._toastService.success(result);
      console.log("Modal retornou ",result);
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


}
