import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StoresService } from '../services/stores.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetStoreResolver implements Resolve<boolean> {
  constructor(private services: StoresService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    return this.services.getStoreById(id).pipe(
      catchError((error) => {
        return of('404');
      })
    );
  }
}
