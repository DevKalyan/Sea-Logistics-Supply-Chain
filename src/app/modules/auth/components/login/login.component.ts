import { Component, OnInit } from '@angular/core';
import { AuthloginViewModel } from 'src/app/core/ViewModels/auth.viewmodel';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
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
constructor(private authService : AuthService,private router: Router) { }
  
ngOnInit(): void {
  }

  validateUserDetails() {
    this.authService.validateUserDetails(this._loginDetails.UserName, this._loginDetails.PassWord)
      .subscribe(
        () => {
          // Navigate to home page after successful login
          this.router.navigate(['/home']);
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          // Optionally, show an error message to the user
        }
      );
  }
}
