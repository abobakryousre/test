import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/stores';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.css'],
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store = {
    _id: '',
    storeName: 'Card title',
    storeDescription:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    storeLogo: 'assets/images/default.jpg',
  };
  baseUrl = environment.apiUrl;
  defaultImage: string = 'assets/images/default.jpg';

  constructor() {}

  ngOnInit(): void {}

  handlenImgError(event: any) {
    event.target.src = this.defaultImage;
  }
}
