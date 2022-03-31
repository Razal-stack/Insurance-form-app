import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InsuranceHomeComponent } from './insurance-home/insurance-home.component';

@NgModule({
  declarations: [InsuranceHomeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
