import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Livro } from '../../entities/livro';
import { LivroService } from '../../services/livro.service';
import { ModalComponent } from '../modal/modal.component';
import { ToastService } from 'angular-toastify';
import { ModalConfirmComponent } from '../modalConfirm/modalConfirm.component';

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
      if (result === "OK") {
        this._toastService.success("Operação realizada com sucesso!!!");
      } else if(result === "ERROR"){
        this._toastService.error("Erro ao realizar operação!!!");
      }       
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

  confirmarDelete(id:any):void{
    const dialogRef = this.dialog.open(ModalConfirmComponent,{
      data:{message:'tem certeza que deseja excluir este livro?'}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result) {
        this.deletar(id);
      }
    });
  }

  deletar(id:any):void{
    this.service.deletar(id).subscribe((resposta) =>{
      if(resposta == null){
        this.service.message("Livro removido com Sucesso");
        this._toastService.success("Livro removido com Sucesso");
        this.livro = this.livro.filter(livro => livro.id_livro != id);
        this.buscarLivros();
      }else{
        this.service.message("Livro não removido");
        this._toastService.error("Livro não removido");
      }

    })
  }


}
