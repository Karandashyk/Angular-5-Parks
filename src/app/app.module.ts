import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import {
  AlertService,
  AuthenticationService,
  UserService,
  ParkService,
  EquipmentService,
  CategoryService,
  ImportExportService,
  SurveyService
} from './_services/index';
import { ParksComponent, AddDialogComponent } from './parks/index';
import { UsersComponent } from './users/index';
import { EquipmentComponent, AddEquipmentDialogComponent } from './equipment/index';
import { ExportComponent } from './export/index';
import { LoginComponent } from './login/index';
import { ParkDetailComponent, SuggestedParkDetailComponent, SuggestionsDialogComponent, AddECDialogComponent } from './park-detail/index';
import {CategoriesComponent, AddCategoryDialogComponent} from './categories/index';
import {SurveysComponent, AddSurveyDialogComponent, DetailedSurveyDialogComponent} from './surveys/index';

import { OwlModule } from 'ngx-owl-carousel';
import { ImageUploadModule } from 'angular2-image-upload';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MaterialModule,
    BrowserAnimationsModule,
    OwlModule,
    ImageUploadModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD84bDJZmR_LAlNNehLDaZ5EgULW0Q3wC4',
      language: 'no',
      region: 'NO'
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
    CategoriesComponent,
    SurveysComponent, AddSurveyDialogComponent, DetailedSurveyDialogComponent
  ],
  entryComponents: [
    SuggestionsDialogComponent,
    AddDialogComponent,
    AddEquipmentDialogComponent,
    AddCategoryDialogComponent,
    AddECDialogComponent,
    AddSurveyDialogComponent,
    DetailedSurveyDialogComponent
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
    SurveyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
