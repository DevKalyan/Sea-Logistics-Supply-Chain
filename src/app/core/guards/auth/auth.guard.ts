import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService: AuthService){}

  canActivate(): boolean {
    if (this.authService.getIsAuthenticated()) {
      return true;
    } else {       // Redirect authenticated users away from the login page
      //this.router.navigate(['/login']);
      return false; // Allow access to the login page if the user is not authenticated      
    }
  }
  
}
