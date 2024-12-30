import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import { FianaceServiceService } from '../../../services/fianace-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DxChartModule, DxPieChartModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [FianaceServiceService]
})
export class DashboardComponent implements OnInit {

  constructor(private service: FianaceServiceService) { }
  totalIncome: number = 1000000;
  spentTillNow: number = 0;
  remainingBudget: number = 0;
  chartData: { month: string, spent: number, saved: number }[] = [];
  pieChartData = [
    { category: 'Daily Needs', amount: 10000 },
    { category: 'Lifestyle', amount: 8000 },
    { category: 'Health', amount: 4000 },
    { category: 'Other', amount: 2000 },
  ];
  ngOnInit(): void {
    this.getIncomeData()
    this.calculateChartData()
  }
  calculateChartData(): void {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const spentAmounts = [76000, 50000, 57000, 60000, 55000, 70000, 65000, 48000, 54000, 60000, 49000, 53000];
    const totalSpent = spentAmounts.reduce((sum, value) => sum + value, 0);
    const monthlyIncome = this.totalIncome / months.length;
  
    // Map months to chart data
    this.chartData = months.map((month, index) => ({
      month,
      spent: spentAmounts[index],
      saved: monthlyIncome - spentAmounts[index] // Allow negative saved values
    }));
  
    console.log(this.chartData); // Debug chart data
  }
  
  


  getIncomeData() {
    let api = `Finance/GetAllIncomeData`
    this.service.getData(api).subscribe(res => {
      if (res.isSuccess) {
        this.totalIncome = res.data.reduce((sum: number, element: any) => sum + element.amount, 0);
      }
       this.getBudgetSettlementData()
    })
  }
  getBudgetSettlementData() {
    let api = `Finance/GetBudgetSettlementData`;
    this.service.getData(api).subscribe(res => {
      if (res.isSuccess) {
        console.log('Budget Settlement Data:', res.data);

        // Calculate SpendBudget from the response
        const totalSpendBudget = res.data.reduce((sum: number, element: any) => sum + element.spendBudget, 0);
        console.log('Total Spend Budget:', totalSpendBudget);
        this.spentTillNow = totalSpendBudget

        // Calculate Remaining Budget
        this.remainingBudget = this.totalIncome - totalSpendBudget;
        console.log('Remaining Budget:', this.remainingBudget);
      } else {
        console.error('Failed to fetch budget settlement data');
      }
    });
  }
}
