import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { BudgetComponent } from './component/finance/budget/budget.component';
import { ExpendatureDataComponent } from './Data/expendature-data/expendature-data.component';
import { IncomeDataComponent } from './Data/income-data/income-data.component';
import { BudgetDataComponent } from './Data/budget-data/budget-data.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo : 'frontpage',
        pathMatch : 'full'
    },
    {
        path: 'frontpage',
        component: FrontpageComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
  
    {
        path: '',
        component: NavmenuComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren:() => import("./component/finance/finance.module").then(m=>m.FinanceModule)
            },
        ]
    },
    {
        path:'finance',
        loadChildren:() => import("./component/finance/finance-routing.module").then(m=>m.FinanceRoutingModule)
    },

   
 
   
   
    
];
