import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl,ValidatorFn,FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return {
          passwordsDontMatch: true
        }
      }

      return null;
  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  constructor(private authService:AuthService,private router:Router){}
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  },{validators: passwordsMatchValidator() });




  signUp(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.getRawValue());
      let info = this.signUpForm.getRawValue();
      this.authService.signUp(info.name,info.email,info.password).then(data=>{
      this.router.navigateByUrl("/invoice")
      })
  }
   
  }

  ngOnInit(): void {
  }

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

}
