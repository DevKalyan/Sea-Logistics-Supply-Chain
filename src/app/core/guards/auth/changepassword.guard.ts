import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserViewModel } from '../../ViewModels/user.model';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordGuard implements CanActivate {


  constructor(private sessionService: SessionStorageService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userDetailsString = this.sessionService.retrieve("_userDetails");
    if (userDetailsString) {
      const userviewModel: UserViewModel = JSON.parse(userDetailsString);
      console.log('Change password Guard', userviewModel);

      // Check if the password has been changed
      const passwordChanged = userviewModel.UserCredentials.PasswordChanged

      if (passwordChanged === 0) {
        // Redirect to the change password page
        this.router.navigate(['/admin/change-password']);
        return false; // Prevent navigation
      }
    }
    return true; // Allow navigation    
  }

}
