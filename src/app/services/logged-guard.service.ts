import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
@Injectable({ providedIn: 'root' }) 


export class LoggedGuardService implements CanActivate {  
    constructor(private _router: Router) { }  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
        if (!localStorage.getItem('user')) {  
            return true;  
        }  
        this._router.navigate(['']);  
        return false;  
    }  
} 