import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { manipulateSearchParams } from '../../services/handle-search-params.service';
import { sweetAlert } from 'src/app/services/sweetalert.services';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  storesList: any;
  page: number = 1;
  totalDocs: number = 0;
  subscriber: any;
  searchQuery: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private services: StoresService
  ) {}

  ngOnInit(): void {
    this.subscriber = this.activatedRoute.data.subscribe({
      next: (res) => {
        this.storesList = res['stores']['data']['docs'];
        this.page = res['stores']['data']['page'];
        this.totalDocs = res['stores']['data']['totalDocs'];
      },
      error: ({ error }) => sweetAlert('error', 'Error', error.message),
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  handlePageChane(page: any): void {
    const queryParams = manipulateSearchParams({
      page,
      storeName: this.searchQuery,
    });
    this.getAllStores(queryParams);
  }

  search(storeName: any): void {
    this.searchQuery = storeName;
    const queryParams = manipulateSearchParams({
      page: 1,
      storeName,
    });
    this.getAllStores(queryParams);
  }

  getAllStores(queryParams: string): void {
    this.subscriber = this.services.getAllStores(queryParams).subscribe({
      next: (res) => {
        this.storesList = res['data']['docs'];
        this.page = res['data']['page'];
        this.totalDocs = res['data']['totalDocs'];
      },
      error: (err) => console.log(err.message),
    });
  }

  delete(_id: any): void {
    this.services.deleteStoreById(_id).subscribe({
      next: (res) => {
        sweetAlert('success', 'Success', 'Store deleted successfully!');
        const queryParams = manipulateSearchParams({
          page: this.page,
          storeName: this.searchQuery,
        });
        this.getAllStores(queryParams);
      },
      error: ({ error }) => {
        sweetAlert('error', 'Error', error.message);
      },
    });
  }
}
