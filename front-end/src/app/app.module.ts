import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { StoreTableComponent } from './components/store-table/store-table.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { StoresListComponent } from './pages/stores-list/stores-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreFormComponent } from './components/store-form/store-form.component';
import { AddStoreComponent } from './pages/add-store/add-store.component';
import { EditStoreComponent } from './pages/edit-store/edit-store.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StoreComponent } from './pages/store/store.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    StoreTableComponent,
    StoreCardComponent,
    NavbarComponent,
    ControlPanelComponent,
    StoresListComponent,
    StoreFormComponent,
    AddStoreComponent,
    EditStoreComponent,
    NotFoundComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
