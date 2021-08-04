import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from 'src/app/interfaces/stores';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store-table',
  templateUrl: './store-table.component.html',
  styleUrls: ['./store-table.component.css'],
})
export class StoreTableComponent implements OnInit {
  @Output() deleteStore = new EventEmitter<string>();
  baseUrl = environment.apiUrl;
  @Input() stores: Store[] = [
    {
      _id: '',
      storeName: '',
      storeDescription: '',
      storeLogo: '',
    },
  ];
  @Input() page: number = 1;
  @Input() totalDocs: number = 0;
  defaultImage: string = 'assets/images/default.jpg';
  constructor() {}

  ngOnInit(): void {}

  deleteConfirmation(_id: string): void {
    confirm('Are you sure?') && this.deleteStore.emit(_id);
  }

  handlenImgError(event: any) {
    event.target.src = this.defaultImage;
  }
}
