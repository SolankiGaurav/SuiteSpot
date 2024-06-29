import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LOGIN_USER, SUBMIT_MAINTAINENCE_REQUEST } from '../constants/urlConstants';
import IToken from '../interfaces/ITokenData';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router,private snackbar:MatSnackBar) {}

  isUserLogin(){
    const token = sessionStorage.getItem('accessToken');
    if(!token){
        return false;
    }
    return true;
  }

  loginUser(user:IUser){
    this.http.post<IToken>(LOGIN_USER,user).subscribe((data:IToken)=>{
        sessionStorage.setItem('accessToken',data.token);
        this.snackbar.open("Logged in successfully","okay",{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
        this.router.navigate(['admin']);
    },(err)=>{
        console.log(err);
    })
  }

}
