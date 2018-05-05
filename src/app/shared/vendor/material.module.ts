import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule,
  MatSlideToggleModule
} from '@angular/material';


export const MODULES = [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MatSlideToggleModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule { }
