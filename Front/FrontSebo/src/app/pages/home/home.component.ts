import { Component, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SaleComponent } from "../../components/sale/sale.component";
import { RecordsComponent } from "../../components/records/records.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [SharedModule, SaleComponent, RecordsComponent]
})
export class HomeComponent {

  @Output() searchEvent = new EventEmitter<string>();

  items: string[] = [];
  filteredItems: string[] = [];
  sectionVisible = true

  constructor() {
    this.filteredItems = this.items;
  }

  visible(visible: boolean){
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
