import { Component, inject, OnInit } from '@angular/core';
import { FianaceServiceService } from '../../services/fianace-service.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DxDataGridModule, DxTemplateModule, DxButtonModule],
  templateUrl: './budget-data.component.html',
  styleUrl: './budget-data.component.css',
  host: { ngSkipHydration: 'true' }
})
export class BudgetDataComponent implements OnInit {

  service = inject(FianaceServiceService);
  router = inject(Router)
  ngOnInit(): void {
    this.getBudgetData();
  }

  BudgetData: any;

  getBudgetData() {
    let api = 'Finance/GetBudgetSettlementData'
    this.service.getData(api).subscribe((res: any) => {
      this.BudgetData = res.data;
      console.log(res.data)
    })
  }

  Back() {
    this.router.navigateByUrl("/dashboard")
  }
  AddBudget() {
    this.router.navigateByUrl("/dashboard/budget")
  }

}
