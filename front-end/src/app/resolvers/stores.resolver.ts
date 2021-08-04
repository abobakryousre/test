import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoresService } from '../services/stores.service';

@Injectable({
  providedIn: 'root',
})
export class StoresResolver implements Resolve<boolean> {
  constructor(private services: StoresService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.services.getAllStores('');
  }
}
