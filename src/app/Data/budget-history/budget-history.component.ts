import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { FianaceServiceService } from '../../services/fianace-service.service';

@Component({
  selector: 'app-budget-history',
  standalone: true,
  imports: [DxDataGridModule],
  templateUrl: './budget-history.component.html',
  styleUrl: './budget-history.component.css',
  providers:[FianaceServiceService]
})
export class BudgetHistoryComponent implements OnInit {
  budgetHistory : any
  constructor(private service : FianaceServiceService){}
  ngOnInit(): void {
    this.getBudgetData()
  }

  getBudgetData() {
    let api = 'Finance/GetAllBudgetData'
    this.service.getData(api).subscribe((res: any) => {
      this.budgetHistory = res.data;
      console.log(res.data,'GetAllBudgetData')
    })
  }

}
