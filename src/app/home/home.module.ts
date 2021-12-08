import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SelectAppComponent } from './select-app/select-app.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { HomeComponent } from './home/home.component';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { LayoutService } from '../layout.service';
import { ApiService } from '../api.service';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ExDialogComponent } from './dialogs/ex-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SelectAppComponent,
    HeaderComponent,
    SideMenuComponent,
    HomeComponent,
    HomeComponent,
    MainMenuComponent,
    NotFoundComponent,
    BusyIndicatorComponent,
    ExDialogComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    MaterialModule,
    OverlayModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    LayoutService,    
    {
      provide: APP_INITIALIZER,
      useFactory: (service: LayoutService) => function() { return service.loadConfiguration(); },
      deps: [LayoutService],
      multi: true
    },
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  exports: [
    SelectAppComponent,
    HeaderComponent,
    SideMenuComponent,
    HomeComponent,
    CommonModule,
    RouterModule,
  ]
})
export class HomeModule { }
