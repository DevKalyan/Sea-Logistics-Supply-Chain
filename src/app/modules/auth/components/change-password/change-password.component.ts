import { Component, OnInit } from '@angular/core';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { UserViewModel } from 'src/app/core/ViewModels/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  showModal: boolean = false;


  constructor(private session: SessionStorageService,
    private fb: FormBuilder,
    private userService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    const userDetailsString = this.session.retrieve("_userDetails");
    const userviewModel: UserViewModel = JSON.parse(userDetailsString);

    this.passwordForm = this.fb.group({
      currentUserName: [userviewModel.UserCredentials.Username, Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
  changePassword() {
    if (this.passwordForm.valid) {
      const userDetailsString = this.session.retrieve("_userDetails");
      const userviewModel: UserViewModel = JSON.parse(userDetailsString);
      //console.log(this.passwordForm.value);
      const userid = userviewModel.UserId;
      const currentUserName = this.passwordForm.value.currentUserName;
      const currentPassword = this.passwordForm.value.currentPassword;
      const newPassword = this.passwordForm.value.newPassword;

      this.userService.changePassword(userid, currentUserName, currentPassword, newPassword).subscribe({
        next: (resonse: any) => {
          this.toastr.success('Password changed Successfully..!', 'Success');
          this.router.navigate(['/login']);
        }, error: (error: HttpErrorResponse) => {
          console.error('Error adding employee:', error);
          this.toastr.error('There was an error Saving employee Details', 'Error');
          return []// Handle error here
        }
      });

    } else {
      // Mark all fields as touched to show validation messages
      this.passwordForm.markAllAsTouched();
    }
  }
}

