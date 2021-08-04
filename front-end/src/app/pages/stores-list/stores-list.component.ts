import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { manipulateSearchParams } from 'src/app/services/handle-search-params.service';
import { StoresService } from 'src/app/services/stores.service';
import { sweetAlert } from 'src/app/services/sweetalert.services';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css'],
})
export class StoresListComponent implements OnInit, OnDestroy {
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

  handlePageChane($event: any): void {
    const queryParams = manipulateSearchParams({
      page: $event,
      storeName: this.searchQuery,
    });
    this.getAllStores(queryParams);
  }

  search($event: any): void {
    this.searchQuery = $event;
    const queryParams = manipulateSearchParams({
      page: 1,
      storeName: $event,
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
      error: ({ error }) => sweetAlert('error', 'Error', error.message),
    });
  }
}
