import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FianaceServiceService } from '../services/fianace-service.service';
import { RegisterModel } from '../Models/finance-model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule,RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerform! : FormGroup
  submit = false;

  constructor(private fb : FormBuilder,
    private router: Router,
    private service:FianaceServiceService
  ){
    this.registerform = this.fb.group({
      Name:['',[Validators.required]],
      Phoneno: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword:['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  get controls(){
    return this.registerform.controls;
  }

  ngOnInit(): void {
  
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('Password')?.value === form.get('ConfirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }
  onSubmit(){
    this.submit = true;
   let api = 'Login/Register'
   const model = new RegisterModel();
   model.name = this.controls['Name'].value;
   model.email = this.controls['email'].value;
   model.phoneno = this.controls['Phoneno'].value;
   model.password=this.controls['Password'].value;
   model.confirmPassword= this.controls['ConfirmPassword'].value;
   if(this.registerform.valid){
    this.service.create(api,model).subscribe((res:any)=>{
      if(res.isSuccess){
        notify({
          message: "Register Successfully",
          width: 300,
          position: {
            my: 'right top',
            at: 'right top',
            offset: '-20 10'
          }
        }, 'success', 2000); 
        // alert("Register Successfully")
        this.router.navigateByUrl('/login')
        this.registerform.reset();
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
        }, 'error', 2000); 
        // alert(res.message);
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
    }, 'error', 2000); 
    // alert("Please Fill All Fields")
   }
  

  }
  switchTologin() {
    // this.router.navigate(['/register']);
   }

}
