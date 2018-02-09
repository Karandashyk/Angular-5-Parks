import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule, MatTabsModule, MatDividerModule, MatGridListModule, MatChipsModule,
  MatTooltipModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule,
  MatDialogModule, MatExpansionModule, MatSlideToggleModule
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSlideToggleModule
],
})
export class MaterialModule { }
