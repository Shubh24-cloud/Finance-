import { Component, inject, OnInit } from '@angular/core';
import { FianaceServiceService } from '../../services/fianace-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,DxDataGridModule,DxTemplateModule,DxButtonModule],
  templateUrl: './income-data.component.html',
  styleUrl: './income-data.component.css'
})
export class IncomeDataComponent implements OnInit {

  service = inject(FianaceServiceService)
  router = inject (Router)
  ngOnInit(): void {
   this.getIncomeData();
  }
  IncomeData:any;
  getIncomeData(){
    let api = 'Finance/GetAllIncomeData'
    this.service.getData(api).subscribe((res:any)=>{
     this.IncomeData = res.data;
     console.log(this.IncomeData)
    })
  }

  Back(){
    this.router.navigateByUrl("/dashboard")
  }
  cashPopup() {
    this.router.navigateByUrl("/dashboard/add")
    }

}
