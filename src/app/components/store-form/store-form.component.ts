import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css'],
})
export class StoreFormComponent implements OnInit {
  @Input() store = {
    storeName: '',
    storeDescription: '',
    storeLogo: '',
  };
  storeLogo: any = null;
  @Output() saveEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.store.storeLogo = '';
  }

  submit(form: any) {
    form.valid &&
      this.saveEvent.emit({
        ...form.value,
        storeLogo: this.storeLogo,
      });
  }

  handleLogoChange(event: any) {
    this.storeLogo = event.target.files[0];
  }
}
