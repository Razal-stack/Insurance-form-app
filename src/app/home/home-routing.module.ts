import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceHomeComponent } from './insurance-home/insurance-home.component';

const routes: Routes = [{ path: '**', component: InsuranceHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
