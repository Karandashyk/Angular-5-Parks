import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule, MatTabsModule, MatDividerModule, MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
   CommonModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule
  ],
})
export class MaterialModule { }
