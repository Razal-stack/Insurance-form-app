import { InsuranceFormSuccessComponent } from './insurance-form-success/insurance-form-success.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    component: InsuranceFormComponent,
  },
  {
    path: 'success',
    component: InsuranceFormSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
