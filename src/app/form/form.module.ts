import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { InsuranceFormSuccessComponent } from './insurance-form-success/insurance-form-success.component';

@NgModule({
  declarations: [InsuranceFormComponent, InsuranceFormSuccessComponent],
  imports: [CommonModule, FormRoutingModule],
})
export class FormModule {}
