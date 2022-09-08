import { HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  user:User | undefined;

  constructor(private api :ApiService) {
   localStorage.getItem("user") ? this.user=JSON.parse(localStorage.getItem("user")) : undefined ;
  }

  login(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      let header = this.api.getHeaders();
      this.api.post("auth/signin",{email,password}).then((data:any)=>{
       this.user=data.user;
       this.user.jwt=data.jwt;
        localStorage.setItem("user",JSON.stringify(this.user));
        resolve(data)
      })
      .catch(err=>reject(err));
  })
 }




 signUp(name : string ,email: string, password: string){
   return new Promise(async (resolve, reject) => {
      let header = this.api.getHeaders();
      this.api.post("auth/signup",{name,email,password}).then((data:any)=>{
       this.user=data.user;
       this.user.jwt=data.jwt;
        localStorage.setItem("user",JSON.stringify(this.user));
        resolve(data)
      })
      .catch(err=>reject(err));
  })
 }

 logout(): void {
 this.user = undefined;
    localStorage.removeItem('user');
 }

 getHeadersWithAuthorization() {
   console.log("Bearer "+this.user.jwt)
   return new HttpHeaders({
   Authorization:"Bearer "+this.user.jwt,
     Accept: "application/json"
   });
 }

}
