import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCashflowsComponent } from './upload-cashflows/upload-cashflows.component';
import { ViewCashflowsComponent } from './view-cashflows/view-cashflows.component';

const routes: Routes = [{
  path: ':appId', component: UploadCashflowsComponent
},
{
  path: ':appId/view-cashflows', component: ViewCashflowsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
