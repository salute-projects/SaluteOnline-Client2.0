import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatCardModule, MatDatepickerModule,
    MatNativeDateModule, MatGridListModule, MatAutocompleteModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSelectModule } from "@angular/material";

import { TreeModule } from 'primeng/primeng';
import { MomentModule } from "angular2-moment";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from '../pipes/string-pipes';


@NgModule({
  imports: [
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
    TreeModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TruncatePipe],
  exports: [
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
    TreeModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe
  ]
})
export class SharedModule { }