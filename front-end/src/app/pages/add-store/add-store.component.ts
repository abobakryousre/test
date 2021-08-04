import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { convertStoreToFormData } from 'src/app/services/convert-store.services';
import { StoresService } from 'src/app/services/stores.service';
import { sweetAlert } from 'src/app/services/sweetalert.services';
@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css'],
})
export class AddStoreComponent implements OnInit {
  constructor(private services: StoresService, private router: Router) {}

  ngOnInit(): void {}

  addStore(store: any) {
    const formData = convertStoreToFormData(store);
    this.services.addNewStore(formData).subscribe({
      next: (res) => this.router.navigate(['/control-panel']),
      error: ({ error }) => {
        error.message.indexOf('duplicate key')
          ? sweetAlert('error', 'Error', 'Store Name already exist')
          : sweetAlert('error', 'Error', error.message);
      },
    });
  }
}
