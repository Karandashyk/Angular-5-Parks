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
import { AlertService, AuthenticationService, UserService, ParkService } from './_services/index';
import { ParksComponent } from './parks/index';
import { UsersComponent } from './users/index';
import { EquipmentComponent } from './equipment/index';
import { ExportComponent } from './export/index';
import { LoginComponent } from './login/index';
import { ParkDetailComponent } from './park-detail/park-detail.component';

import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterialModule,
    BrowserAnimationsModule,
    OwlModule
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
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ParkService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
