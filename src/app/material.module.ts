import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule, MatTabsModule, MatDividerModule, MatGridListModule, MatChipsModule,
  MatTooltipModule, MatIconModule
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
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
],
})
export class MaterialModule { }
