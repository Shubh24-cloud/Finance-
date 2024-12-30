import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IncomeModel } from '../../../Models/finance-model';
import { FianaceServiceService } from '../../../services/fianace-service.service';
import { Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DxDataGridModule, DxTemplateModule, DxButtonModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  cashForm!: FormGroup;
  submitCash = false;
  showTable: boolean = true;
  IncomeData: any;
  showCashForm:boolean=true;

  service = inject(FianaceServiceService);
  router = inject(Router);
  constructor(private fb: FormBuilder) {
    this.cashForm = this.fb.group({
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });
  }
  get Controls() {
    return this.cashForm.controls;
  }

  ngOnInit(): void {
    this.getIncomeData();
  }
  onSubmitCash() {
    this.submitCash = true;
    let api = 'Login/AddIncome'
    const model = new IncomeModel()
    model.amount = this.Controls['amount'].value;
    model.source = this.Controls['source'].value;
    model.date = this.Controls['date'].value;

    if (this.cashForm.valid) {
      this.service.create(api, model).subscribe((res: any) => {
        if (res.isSuccess) {
          notify({
            message: "Cash Added SuccessFully",
            width: 300,
            position: {
              my: 'right top',
              at: 'right top',
              offset: '-20 10'
            }
          }, 'success');
          this.submitCash = false;
          this.cashForm.reset();
        this.router.navigateByUrl('/dashboard/IncomeData')
        }
        else {
          notify({
            message: "Error Occured",
            width: 300,
            position: {
              my: 'right top',
              at: 'right top',
              offset: '-20 10'
            }
          }, 'error', 2000);
          // alert("Error Occured");
        }
      })
    }
    else {
      notify({
        message: "Please Entered All fields",
        width: 300,
        position: {
          my: 'right top',
          at: 'right top',
          offset: '-20 10'
        }
      }, 'warning', 2000);
      // alert("Please Entered All fields");
    }
  }
cashPopup(){
this.router.navigateByUrl("/dashboard/IncomeData")
}

  getIncomeData() {
    let api = 'Finance/GetAllIncomeData'
    this.service.getData(api).subscribe((res: any) => {
      this.IncomeData = res.data;
      console.log(this.IncomeData)
    })
  }
}
