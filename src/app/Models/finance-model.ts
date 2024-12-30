export class FinanceModel {
}

export class RegisterModel{
id: number=0;
name:string='';
phoneno:string='';
email:string='';
password:string='';
confirmPassword:string='';
}

export class LoginModel{
id:number=0;
email:string='';
password:string=''
}

export class IncomeModel{
id:number=0;
source:string='';
amount:number=0;
date:string='';
}

export class expenditureModel{
id :number=0;
purpose:string='';
amount:number=0;
date:string='';
}

export class BudgetModel{
id:number=0;
category:string='';
amount:number=0;
budgetPeriod:string='';
startDate:string='';
endDate:string='';
fkbudgetid : number= 0
}

