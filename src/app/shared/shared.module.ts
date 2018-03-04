import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatCardModule, MatDatepickerModule,
    MatNativeDateModule, MatGridListModule, MatAutocompleteModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatListModule, MatProgressSpinnerModule, 
    MatProgressBarModule, MatSortModule } from "@angular/material";

import { TreeModule } from 'primeng/primeng';
import { MomentModule } from "angular2-moment";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from '../pipes/string-pipes';
import { GlobalState } from '../services/global.state';
import { ModuleWithProviders } from '@angular/compiler/src/core';


@NgModule({
  imports: [
    MatListModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule,
    TreeModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TruncatePipe],
  exports: [
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule,
    TreeModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [GlobalState]
    }
  }
}