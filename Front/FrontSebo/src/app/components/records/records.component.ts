import { Component, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent {
  @Output() searchEvent = new EventEmitter<string>();

  items: string[] = ['Aline', 'Ana', 'Beatriz', "Barbara"];
  filteredItems: string[] = [];
  sectionVisible = false


  constructor(public dialog: MatDialog) {
    this.filteredItems = this.items;
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
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
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