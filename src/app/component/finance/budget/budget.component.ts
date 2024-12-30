import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BudgetModel, expenditureModel } from '../../../Models/finance-model';
import { FianaceServiceService } from '../../../services/fianace-service.service';
import { Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DxDataGridModule, DxTemplateModule, DxButtonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetForm!: FormGroup;
  isBudgetFormVisible: boolean = false;
  submitBudget: boolean = false;
  expenditureForm: FormGroup;
  isExpenditureFormVisible = false;
  submitExpenditure = false;
  tableHide: boolean = true;

  existingBudget = {
    totalBudget: 5000,
    spent: 2000,
    remaining: 3000,
    category: 'Entertainment',
    period: 'Monthly'
  };
  ShowExisting: boolean = false;
  router = inject(Router);

  constructor(private fb: FormBuilder, private service: FianaceServiceService) {
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      period: ['monthly', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.expenditureForm = this.fb.group({
      Purpose: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });
  }
  get Controls() {
    return this.budgetForm.controls;
  }
  get ExpenditureControls() {
    return this.expenditureForm.controls;
  }

  ngOnInit(): void {

    this.updateRemainingBudget();

  }

  toggleBudgetForm(): void {
    this.isBudgetFormVisible = !this.isBudgetFormVisible;
    this.isExpenditureFormVisible = false;
    this.ShowExisting = true;
  }
  toggleExpenditureForm() {
    this.isExpenditureFormVisible = !this.isExpenditureFormVisible;
    this.isBudgetFormVisible = false;
    this.ShowExisting = true;
  }


  onSubmitBudget(): void {
    this.submitBudget = true;
    let api = 'Login/AddBudget'
    const model = new BudgetModel();
    model.amount = this.Controls['amount'].value;
    model.budgetPeriod = this.Controls['period'].value;
    model.category = this.Controls['category'].value;
    model.startDate = this.Controls['startDate'].value;
    model.endDate = this.Controls['endDate'].value;
    console.log(model)

    if (this.budgetForm.valid) {
      this.service.create(api, model).subscribe((res: any) => {
        if (res.isSuccess) {
          notify({
            message: "Budget Added Successfully",
            width: 300,
            position: {
              my: 'right top',
              at: 'right top',
              offset: '-20 10'
            }
          }, 'success', 2000);
          // alert("Budget Added Successfully");
          const budgetData = this.budgetForm.value;
          console.log('Budget Created:', budgetData);

          this.existingBudget.totalBudget += budgetData.amount;
          this.updateRemainingBudget();

          this.budgetForm.reset();
          this.submitBudget = false;
          this.router.navigateByUrl("/dashboard/budget-history")

        }
        else {
          notify({
            message: res.message,
            width: 300,
            position: {
              my: 'right top',
              at: 'right top',
              offset: '-20 10'
            }
          }, 'error', 2000);
          // alert("Error Occured");
          console.log(res)
        }
      })

    }
    else {
      notify({
        message: "Please Fill All Fields",
        width: 300,
        position: {
          my: 'right top',
          at: 'right top',
          offset: '-20 10'
        }
      }, 'warning', 2000);
      // alert("Please Fill All Fields")

    }
  }


  updateRemainingBudget(): void {
    this.existingBudget.remaining = this.existingBudget.totalBudget - this.existingBudget.spent;
  }
  listBudget() {
    this.router.navigateByUrl("/dashboard/budget-history")
  }

}
