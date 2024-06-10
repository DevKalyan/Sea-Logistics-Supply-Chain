import { Component, OnInit } from '@angular/core';
import { UserViewModel } from 'src/app/core/ViewModels/user.model';
import { MenuService } from 'src/app/core/services/menu.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DesignationViewModel } from 'src/app/core/ViewModels/designation.viewmodel';
import { DesignationService } from 'src/app/shared/components/services/designation.service';
import { CommonService } from 'src/app/shared/components/services/common.service';
import { UsertypeService } from 'src/app/shared/components/services/usertype.service';
import { UserTypeViewModel } from 'src/app/core/ViewModels/usertype.viewmodel';
import { ToastrService } from 'ngx-toastr';
import { EmailViewModel } from 'src/app/shared/viewmodels/email.viewmodel';
import { AuthService } from '../../services/auth/auth.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  menuSubscription: Subscription | undefined;
  menuData: any[] = [];
  employeeform: FormGroup;
  menusForm: FormGroup;
  submitted: boolean = false;
  designationDetails: DesignationViewModel[] = [];
  usertypeDetails: UserTypeViewModel[] = [];
  countries: any = []
  emailParameters: EmailViewModel = {
    recieptentEmails: '',
    senderEmail: '',
    recieptentCCemails: '',
    recieptentBCCemails: '',
    emailSubject: '',
    emailBody: '',
    AttachmentList: []
  }; // Initialize emailParameters with default values

  selecteMenuString: string;

  constructor(private menuService: MenuService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private designationService: DesignationService,
    private commonService: CommonService,
    private usertypeService: UsertypeService,
    private sessionService: SessionStorageService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    //First, you need to define a form control for your checkboxes in your component's TypeScript file.
    this.menusForm = this.formBuilder.group({
      selectedMenus: this.formBuilder.array([]) // Define selectedMenus as a FormArray
    });
  }

  ngOnInit(): void {
    this.employeeform = this.formBuilder.group({
      UserBasicDetails: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        middleName: [''],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        emailId: ['', [Validators.required, Validators.email]],
        country: ['',],
        state: ['', Validators.required],
        postalCode: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        phoneNo: ['', Validators.required],
        designation: ['', Validators.required],
        userType: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        passwordChanged: [''],
        passwordChangeDate: [''],
        isActive: [''],
        timeZone: [''],
        dayLightSaving: []
      }),
      UserMenuDetails: {
        AssingedMenuCodes: []
      },
      CreatedAt: new Date(), // Set to the current timestamp
      CreatedBy: [],
      ModifiedAt: new Date(), // Set to the current timestamp
      ModifiedBy: []
    });

    //Loop through your menu items and create a FormControl for each
    // this.menuData.menuDetails.forEach(item => {
    //   this.menusForm.addControl(item.menuDetailsCode,this.formBuilder.control(false));      
    // });

    this.LoadDesignationDetails();
    this.LoadUserTypeDetails();
    this.LoadCountries();
    this.LoadMenus();
    this.selecteMenuString='';
  }
  getSelectedMenus(e: any) {
    let menuArray = this.menusForm.get('selectedMenus') as FormArray;

    if (e.target.checked) {
      menuArray.push(new FormControl(e.target.value))
    } else {
      let i = 0;
      menuArray.controls.forEach((menu: any) => {
        if (menu.value == e.target.value) { // Compare the value of the FormControl
          menuArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.selecteMenuString = menuArray.value.join(',');
    console.log("Selected Menus", this.selecteMenuString);
  }
  LoadCountries() {
    this.commonService.getAllCountries().subscribe({
      next: (response: any) => {
        //console.log('Countries List Details', response);
        this.countries = response;
      }
    })
  }

  LoadDesignationDetails() {
    this.designationService.getAllDesignationDetails().subscribe({
      next: (response: any) => {
        //console.log('Designation Details', response);
        this.designationDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error);
        return []// Handle error here
      }
    });
  }
  LoadUserTypeDetails() {
    this.usertypeService.GetAllUserTypes().subscribe({
      next: (response: any) => {
        //console.log('UserType Details', response);
        this.usertypeDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error);
        return []// Handle error here
      }
    });
  }
  LoadMenus() {
    this.menuService.getAllMenus().subscribe({
      next: (response: any) => {
        this.menuData = response;
        console.log('Menus', response);
        // Assuming you want to assign the first menu for now
        // You might want to iterate over all menus depending on your requirement
        // if (response.length > 0) {
        //   this.menuData = response[0];
        // }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading menus:', error);
        // Handle error here
      }
    });
  }


  CreateNewEmployee() {
    this.submitted = true;
    if (this.employeeform.invalid) {
      return;
    }

    const userDetailsString = this.sessionService.retrieve("_userDetails");
    const userviewModel: UserViewModel = JSON.parse(userDetailsString);
    const userid = userviewModel.UserId;
    console.log("Selected Menus", JSON.stringify(this.menusForm.value)); // This will log the selected checkboxes

    let empDetails: UserViewModel = {
      UserId: '69902c53-9497-4b70-9603-6f7fb550f9bf',
      UserBasicDetails: {
        User_FirstName: this.employeeform.get('UserBasicDetails.firstName')?.value,
        User_MiddleName: this.employeeform.get('UserBasicDetails.middleName')?.value,
        User_LastName: this.employeeform.get('UserBasicDetails.lastName')?.value,
        User_Email: this.employeeform.get('UserBasicDetails.emailId')?.value,
        User_Designation: this.employeeform.get('UserBasicDetails.designation')?.value, // Adjust this based on your designation model
        User_Country: this.employeeform.get('UserBasicDetails.country')?.value,
        User_State: this.employeeform.get('UserBasicDetails.state')?.value,
        User_PostalCode: this.employeeform.get('UserBasicDetails.postalCode')?.value,
        User_PhoneNumber: this.employeeform.get('UserBasicDetails.phoneNo')?.value,
        User_DateOfBirth: new Date(this.employeeform.get('UserBasicDetails.dateOfBirth')?.value), // Assuming dateOfBirth is a Date object
        User_Type: this.employeeform.get('UserBasicDetails.userType')?.value,
        User_Active: this.employeeform.get('UserBasicDetails.isActive')?.value == true ? "Active" : "In-Active",
        User_DayLight: this.employeeform.get('UserBasicDetails.dayLightSaving')?.value == true ? "Yes" : "No",
        User_TimeZone: this.employeeform.get('UserBasicDetails.timeZone')?.value
      },
      UserCredentials: {
        Username: this.employeeform.get('UserBasicDetails.username')?.value,
        PasswordHash: this.employeeform.get('UserBasicDetails.password')?.value,
        PasswordChanged: this.employeeform.get('UserBasicDetails.passwordChanged')?.value == "YES" ? 1 : 0, // Add appropriate default value        
      },
      UserMenuDetails: {
        AssingedMenuCodes: this.selecteMenuString
      },
      createdBy: userid, // Set to the current user's ID
      createdAt: new Date(), // Set to the current timestamp
      modifiedBy: userid, // Initially empty
      modifiedAt: new Date(), // Initially set to the creation timestamp      
    };
    console.log(this.employeeform.value);
    this.authService.InsertNewEmployeeDetails(empDetails).subscribe({
      next: (response: any) => {
        console.log('Employee added successfully:', response);
        this.toastr.success('Employee Details Added Successfully', 'Success');
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error);
        this.toastr.error('There was an error Saving employee Details', 'Error');
        // Handle specific errors or additional error handling here
        // For example:
        // if (error.status === 401) {
        //    // Redirect to login page
        // }
      }
    });
  }
  menuCheckboxState: boolean[] = [];
  // Function to manually reset the form
  resetForm() {
    this.selecteMenuString='';
    this.employeeform.reset(); // Reset the entire form

  // Reset individual form controls and nested form groups
  const userBasicDetails = this.employeeform.get('UserBasicDetails') as FormGroup;
  userBasicDetails.reset();

  // Reset dropdowns to default value (selectedIndex = 0)
  userBasicDetails.get('country')?.setValue('');
  userBasicDetails.get('designation')?.setValue('');
  userBasicDetails.get('userType')?.setValue('');
  userBasicDetails.get('state')?.setValue('');
  userBasicDetails.get('timeZone')?.setValue('');

  // Clear any validation errors
  Object.keys(userBasicDetails.controls).forEach(key => {
    userBasicDetails.controls[key].setErrors(null);
  });
    this.clearCheckboxes();   
  }

  clearCheckboxes() {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });
  }

}  // function to get all Users;

