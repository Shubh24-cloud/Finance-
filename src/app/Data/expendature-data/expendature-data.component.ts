import { Component, inject, OnInit } from '@angular/core';
import { FianaceServiceService } from '../../services/fianace-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expendature-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,DxDataGridModule,DxTemplateModule,DxButtonModule],
  templateUrl: './expendature-data.component.html',
  styleUrl: './expendature-data.component.css'
})
export class ExpendatureDataComponent implements OnInit {
  service = inject(FianaceServiceService)
  router = inject(Router)
  ngOnInit(): void {
  this.getExpenditureData();
  }

ExpenditureData:any;
getExpenditureData(){
  let api = 'Finance/GetAllExpenditureData'
  this.service.getData(api).subscribe((res:any)=>{
    this.ExpenditureData = res.data
    console.log(this.ExpenditureData)
  })
}

Back(){
  this.router.navigateByUrl("/dashboard")
}
}
