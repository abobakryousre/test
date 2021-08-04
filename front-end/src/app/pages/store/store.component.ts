import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sweetAlert } from 'src/app/services/sweetalert.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  subscriber: any;
  store: any;
  defaultImage: string = 'assets/images/default.jpg';
  baseUrl = environment.apiUrl;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscriber = this.activatedRoute.data.subscribe({
      next: (res) => {
        res.store === '404' && this.router.navigate(['/404']);
        this.store = res.store?.data;
      },
      error: ({ error }) => sweetAlert('error', 'Error', error.message),
    });
  }

  handlenImgError(event: any) {
    event.target.src = this.defaultImage;
  }
}
