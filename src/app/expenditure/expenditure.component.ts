import { Component, inject } from '@angular/core';
import { BudgetModel, expenditureModel } from '../Models/finance-model';
import notify from 'devextreme/ui/notify';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { Router } from '@angular/router';
import { FianaceServiceService } from '../services/fianace-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenditure',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,DxDataGridModule,DxTemplateModule,DxButtonModule,CommonModule],
  templateUrl: './expenditure.component.html',
  styleUrl: './expenditure.component.css'
})
export class ExpenditureComponent {
  budgetForm!: FormGroup;
  isBudgetFormVisible: boolean = false;
  submitBudget: boolean = false;
  expenditureForm: FormGroup;
  isExpenditureFormVisible = false;
  submitExpenditure = false;
  tableHide:boolean=true;
  budgetData : any
  budgetid :any

  existingBudget = {
    totalBudget: 5000,
    spent: 2000,
    remaining: 3000,
    category: 'Entertainment',
    period: 'Monthly'
  };
  ShowExisting:boolean=false;
  router = inject(Router);

  constructor(private fb: FormBuilder,private service: FianaceServiceService) { 
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
  get Controls(){
    return this.budgetForm.controls;
  }
  get ExpenditureControls(){
    return this.expenditureForm.controls;
  }

  ngOnInit(): void {
   
    this.updateRemainingBudget();

  }

  toggleBudgetForm(): void {
    this.isBudgetFormVisible = !this.isBudgetFormVisible;
    this.isExpenditureFormVisible = false; 
    this.ShowExisting= true;
  }
  toggleExpenditureForm() {
    this.isExpenditureFormVisible = !this.isExpenditureFormVisible;
    this.isBudgetFormVisible = false; 
    this.ShowExisting=true;
  }

  
  onSubmitBudget(): void {
    this.submitBudget = true;
    let api = 'Login/AddBudget'
    const model = new BudgetModel();
    model.amount = this.Controls['amount'].value;
    model.budgetPeriod= this.Controls['period'].value;
    model.category = this.Controls['category'].value;
    model.startDate = this.Controls['startDate'].value;
    model.endDate = this.Controls['endDate'].value;
    model.fkbudgetid = this.budgetid
    if (this.budgetForm.valid) {
      this.service.create(api,model).subscribe((res:any)=>{
        if(res.isSuccess){
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
      // this.isBudgetFormVisible = false;
    this.tableHide=false;
      
        }
        else{
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
          console.log(res)
        }
      })
     
    }
    else{
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
  onSubmitExpenditure() {
    this.submitExpenditure = true;
    let api = `Login/AddExpenditure`
    const model = new expenditureModel()
    model.amount = this.ExpenditureControls['amount'].value
    model.date = this.ExpenditureControls['date'].value
    model.purpose = this.ExpenditureControls['Purpose'].value
    if(this.expenditureForm.valid){
      this.service.create(api,model).subscribe((res:any)=>{
       if(res.isSuccess){
        notify({
          message: "Expenditure Added Successfully",
          width: 300,
          position: {
            my: 'right top',
            at: 'right top',
            offset: '-20 10'
          }
        }, 'success', 2000);
        this.submitExpenditure = false;
        this.expenditureForm.reset();
        this.router.navigateByUrl("/dashboard/ExpendatureData")
       }
       else{
        notify({
          message: res.message,
          width: 300,
          position: {
            my: 'right top',
            at: 'right top',
            offset: '-20 10'
          }
        }, 'warning', 2000);
    
       }
      })
    }
    else{
      notify({
        message: "Please Fill All Fields",
        width: 300,
        position: {
          my: 'right top',
          at: 'right top',
          offset: '-20 10'
        }
      }, 'warning', 2000);
      // alert("Please Entered All Fields")
    }
  }
}
