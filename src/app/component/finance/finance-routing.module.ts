import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { BudgetComponent } from './budget/budget.component';

const routes: Routes = [
{path:'budget',
  component:BudgetComponent
},
{
  path:'add',
  component:AddComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
