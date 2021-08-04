import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStoreComponent } from './pages/add-store/add-store.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { EditStoreComponent } from './pages/edit-store/edit-store.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StoreComponent } from './pages/store/store.component';
import { StoresListComponent } from './pages/stores-list/stores-list.component';
import { GetStoreResolver } from './resolvers/get-store.resolver';
import { StoresResolver } from './resolvers/stores.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/control-panel',
    pathMatch: 'full',
  },
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    resolve: {
      stores: StoresResolver,
    },
  },
  {
    path: 'stores-list',
    component: StoresListComponent,
    resolve: {
      stores: StoresResolver,
    },
  },
  {
    path: 'stores-list/:id',
    component: StoreComponent,
    resolve: {
      store: GetStoreResolver,
    },
  },
  {
    path: 'add-store',
    component: AddStoreComponent,
  },
  {
    path: 'edit-store/:id',
    component: EditStoreComponent,
    resolve: {
      store: GetStoreResolver,
    },
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
