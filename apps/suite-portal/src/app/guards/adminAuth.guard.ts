import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router:Router,private authService:AuthService) {}
  canActivate(): Promise<boolean | UrlTree>{
        if(!this.authService.isUserLogin()){
            return Promise.resolve(this.router.createUrlTree(['login']));
        }else{
            return Promise.resolve(true);
        }
  }
}
