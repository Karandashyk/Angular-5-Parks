import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, ParkService, EquipmentService, CategoryService, ImportExportService } from './_services/index';
import { ParksComponent, AddDialogComponent } from './parks/index';
import { UsersComponent } from './users/index';
import { EquipmentComponent, AddEquipmentDialogComponent } from './equipment/index';
import { ExportComponent } from './export/index';
import { LoginComponent } from './login/index';
import { ParkDetailComponent, SuggestedParkDetailComponent, SuggestionsDialogComponent, AddECDialogComponent } from './park-detail/index';
import {CategoriesComponent, AddCategoryDialogComponent} from './categories/index';

import { OwlModule } from 'ngx-owl-carousel';
import { ImageUploadModule } from 'angular2-image-upload';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterialModule,
    BrowserAnimationsModule,
    OwlModule,
    ImageUploadModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD84bDJZmR_LAlNNehLDaZ5EgULW0Q3wC4'
    }),
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    ParksComponent,
    EquipmentComponent,
    ExportComponent,
    UsersComponent,
    ParkDetailComponent,
    LoginComponent,
    SuggestedParkDetailComponent,
    SuggestionsDialogComponent, AddDialogComponent, AddEquipmentDialogComponent, AddCategoryDialogComponent, AddECDialogComponent,
    CategoriesComponent
  ],
  entryComponents: [
    SuggestionsDialogComponent,
    AddDialogComponent,
    AddEquipmentDialogComponent,
    AddCategoryDialogComponent,
    AddECDialogComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ParkService,
    EquipmentService,
    CategoryService,
    ImportExportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
