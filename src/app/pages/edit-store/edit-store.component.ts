import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { convertStoreToFormData } from 'src/app/services/convert-store.services';
import { StoresService } from 'src/app/services/stores.service';
import { sweetAlert } from 'src/app/services/sweetalert.services';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css'],
})
export class EditStoreComponent implements OnInit {
  subscriber: any;
  store: any;
  _id: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private services: StoresService
  ) {}

  ngOnInit(): void {
    this.subscriber = this.activatedRoute.data.subscribe({
      next: (res) => {
        res.store === '404' && this.router.navigate(['/404']);
        this._id = res.store?.data?._id;
        this.store = res.store?.data;
      },
      error: ({ error }) => sweetAlert('error', 'Error', error.message),
    });
  }

  editStore(store: any) {
    const formData = convertStoreToFormData(store);
    this.services.editStoreById(this._id, formData).subscribe({
      next: (res) => this.router.navigate(['/control-panel']),
      error: ({ error }) => {
        sweetAlert('error', 'Error', error.message);
      },
    });
  }
}
