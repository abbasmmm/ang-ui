import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SelectAppComponent } from './home/select-app/select-app.component';
import { MaterialModule } from './material.module';
import { ProgressComponent } from './progress/progress.component';
import { UploadCashflowsComponent } from './upload-cashflows/upload-cashflows.component';
import { ViewCashflowsComponent } from './view-cashflows/view-cashflows.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadCashflowsComponent,
    ViewCashflowsComponent,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent, SelectAppComponent]
})
export class AppModule { }
