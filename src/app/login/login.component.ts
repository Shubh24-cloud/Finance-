import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FianaceServiceService } from '../services/fianace-service.service';
import { LoginModel } from '../Models/finance-model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  submit = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private service :FianaceServiceService
  ) { 
    this.loginform = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get Controls(){
    return this.loginform.controls;
  }
  
  ngOnInit(): void {
  
  }
  onSubmit() {
    this.submit = true;
   let api = 'Login/CheckLogin'
   const model = new LoginModel();
   model.email = this.Controls['email'].value;
   model.password = this.Controls['password'].value;
   if(this.loginform.valid){
    this.service.create(api,model).subscribe((res:any)=>{
      if(res.isSuccess){
        notify({
          message: "Login Successfully",
          width: 300,
          position: {
            my: 'right top',
            at: 'right top',
            offset: '-20 10'
          }
        }, 'success', 2000); 
        this.loginform.reset();
        this.router.navigateByUrl('/dashboard')
      }
      else{
        notify({
          message: "Wrong Email or Password",
          width: 300,
          position: {
            my: 'right top',
            at: 'right top',
            offset: '-20 10'
          }
        }, 'error', 2000); 
        // alert("Wrong Email or Password");

      }
     })
   }
   else{
    notify({
      message: "Enter The Field First",
      width: 300,
      position: {
        my: 'right top',
        at: 'right top',
        offset: '-20 10'
      }
    }, 'warning', 2000); 
    // alert("Enter The Field First")
   }
  

    
  }
  switchToRegister(): void {
    // this.router.navigate(['/register']);
  }
}

