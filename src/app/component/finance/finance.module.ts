import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpendatureDataComponent } from '../../Data/expendature-data/expendature-data.component';
import { IncomeDataComponent } from '../../Data/income-data/income-data.component';
import { ExpenditureComponent } from '../../expenditure/expenditure.component';
import { BudgetDataComponent } from '../../Data/budget-data/budget-data.component';
import { BudgetHistoryComponent } from '../../Data/budget-history/budget-history.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path:'add',
    component : AddComponent 
  },
  {
    path:'budget',
    component : BudgetComponent
  },
  {
    path:'ExpendatureData',
    component:ExpendatureDataComponent
},
{
  path:'IncomeData',
  component:IncomeDataComponent
},
{
  path:'Expenditure',
  component:ExpenditureComponent
},
{
  path:'BudgetData',
  component:BudgetDataComponent
},
{
  path:'budget-history',
  component:BudgetHistoryComponent
},
];
@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    FinanceRoutingModule,
    RouterModule.forChild(routes) 
  ]
})
export class FinanceModule { }
