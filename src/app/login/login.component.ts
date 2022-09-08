
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;


  constructor(private fb:FormBuilder,
               private authService : AuthService,
               private router:Router) {

                      this.loginForm = this.fb.group({
                        email:['',[Validators.email,Validators.required]],
                        password:['',Validators.required]
                      })




               }


  // loginForm = new FormGroup({
  //   email: new FormControl('',[Validators.required, Validators.email]),
  //   password: new FormControl('',Validators.required),
  // });


login(){
  if (this.loginForm.valid) {
    console.log(this.loginForm.getRawValue());
    let info = this.loginForm.getRawValue();
    this.authService.login(info.email,info.password).then(data=>{
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['/invoice']);
      });
    })
}
 
}







  ngOnInit(): void {
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }


  submit(){

  }


}


