import { Component, OnInit } from '@angular/core';
import { AuthloginViewModel } from 'src/app/core/ViewModels/auth.viewmodel';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {SessionStorageService} from 'ngx-webstorage'
import { UserViewModel } from 'src/app/core/ViewModels/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
   _loginDetails: AuthloginViewModel = {
    UserName: '',
    PassWord: ''    
};
errorMessage: string = '';
constructor(private authService : AuthService,private router: Router,private sessionService: SessionStorageService) { }
  
ngOnInit(): void {
  }

  validateUserDetails(): void {
    this.authService.validateUserDetails(this._loginDetails.UserName, this._loginDetails.PassWord).subscribe({
      next: (response: UserViewModel) => {       
        if (response && response.UserId) {
          // User authenticated successfully
          // Log the response for debugging purposes
          this.sessionService.store("_userDetails",JSON.stringify(response));
          //console.log("Session Value", this.session.retrieve('_userDetails')); 
          this.router.navigate(['/home']);
        } else {
          // Authentication failed
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error in validating user", error.status);
        if (error.status === 404) {
          this.errorMessage = 'Invalid credentials. Please try again.';
      } else {
          this.errorMessage = 'An error occurred while processing your request. Please try again later.';
      }
      }
    });      
  }
}
