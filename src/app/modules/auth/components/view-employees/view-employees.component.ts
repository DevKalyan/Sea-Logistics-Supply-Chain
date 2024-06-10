import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserViewModel } from 'src/app/core/ViewModels/user.model';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DesignationViewModel } from 'src/app/core/ViewModels/designation.viewmodel';
import { DesignationService } from 'src/app/shared/components/services/designation.service';
import { CommonService } from 'src/app/shared/components/services/common.service';
import { UsertypeService } from 'src/app/shared/components/services/usertype.service';
import { UserTypeViewModel } from 'src/app/core/ViewModels/usertype.viewmodel';
import { EmailViewModel } from 'src/app/shared/viewmodels/email.viewmodel';
import { AuthService } from '../../services/auth/auth.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  menuData: any[] = [];
  employeesList: UserViewModel[];
  filteredEmployeesList: UserViewModel[];
  searchText: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  errorMessage: string | null = null;
  items: any[] = [];
  editItem: any = {};
  @ViewChild('editModal') editModal: any;
  @ViewChild('deleteModal') deleteModal: any;

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
  };
  action: string = ''; // Action can be 'edit' or 'delete'
  modalTitle: string = ''; // Title for the modal
  showConfirmationModal: boolean = false;
  confirmationModalTitle: string = '';
  confirmationModalMessage: string = '';
  showUserIdColumn: boolean = false; // Initially set to false
  selectedMenus: any;
  selectedEmployee: UserViewModel | null = null;
  selecteMenuString: string;
  
  constructor(private menuService: MenuService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private designationService: DesignationService,
    private commonService: CommonService,
    private usertypeService: UsertypeService,
    private http: HttpClient,
    private toastr: ToastrService,
    private sessionService: SessionStorageService
  ) {
    //First, you need to define a form control for your checkboxes in your component's TypeScript file.
    this.menusForm = this.formBuilder.group({
      selectedMenus: this.formBuilder.array([])
    });

  }
  ngOnInit(): void {
    this.employeeform = this.formBuilder.group({
      userid: [''],
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
      ModifiedAt: [],
      ModifiedBy: []
    });
    this.LoadDesignationDetails();
    this.loadAllEmployees()
    this.LoadUserTypeDetails();
    this.LoadCountries();
    this.LoadMenus();
  }
  loadAllEmployees() {
    this.errorMessage = null; // Clear any previous errors
    this.authService.getAllEmployes().subscribe({
      next: (response: any) => {
        this.employeesList = response;
        this.filteredEmployeesList = response;
        //console.log('Load employees Data function', this.filteredEmployeesList);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Error loading employees: ' + error.message;
        console.error('Error:', error);
      }
    });
  }
  LoadCountries() {
    this.commonService.getAllCountries().subscribe({
      next: (response: any) => {
        //console.log('Countries List Details', response);
        this.countries = response;
      }
    })
  }
  LoadMenus() {
    this.menuService.getAllMenus().subscribe({
      next: (response: any) => {
        this.menuData = response;
        //console.log('Menus', response);
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
  // // Function to check if a menu item is selected
  // isSelected(menuDetailsCode: string): boolean {
  //   return this.selectedMenus.includes(menuDetailsCode);
  // }
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
  search() {
    this.filteredEmployeesList = this.employeesList.filter(employee =>
      employee.UserBasicDetails.User_FirstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.UserBasicDetails.User_LastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.UserBasicDetails.User_Email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.UserBasicDetails.User_PhoneNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.UserCredentials.Username.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1; // Reset pagination to first page after search
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }

  editEmployee(employee: UserViewModel) {
    console.log("Input received for edit", employee);

    this.action = 'edit';
    this.modalTitle = 'Edit Employee';

    this.selectedEmployee = employee;
    this.employeeform.patchValue({
      userId: employee.UserId, // Update userId if needed
      UserBasicDetails: {
        firstName: employee.UserBasicDetails.User_FirstName,
        middleName: employee.UserBasicDetails.User_MiddleName,
        lastName: employee.UserBasicDetails.User_LastName,
        emailId: employee.UserBasicDetails.User_Email,
        country: employee.UserBasicDetails.User_Country,
        state: employee.UserBasicDetails.User_State,
        postalCode: employee.UserBasicDetails.User_PostalCode,
        dateOfBirth: employee.UserBasicDetails.User_DateOfBirth,
        phoneNo: employee.UserBasicDetails.User_PhoneNumber,
        designation: employee.UserBasicDetails.User_Designation,
        userType: employee.UserBasicDetails.User_Type,
        username: employee.UserCredentials.Username,
        password: employee.UserCredentials.PasswordHash,
        passwordChanged: employee.UserCredentials.PasswordChanged,
        isActive: employee.UserBasicDetails.User_Active,
        timeZone: employee.UserBasicDetails.User_TimeZone,
        dayLightSaving: employee.UserBasicDetails.User_DayLight
      },
      UserMenuDetails: {
        AssingedMenuCodes: employee.UserMenuDetails.AssingedMenuCodes
      },
      modifiedBy: this.sessionService.retrieve('_UserId')
    });
    this.editModal.nativeElement.style.display = 'block'; // Show the modal
  }

  isSelected(menuDetailsCode: string): boolean | undefined {
    if (this.selectedEmployee) {
      const selectedMenus = this.selectedEmployee.UserMenuDetails.AssingedMenuCodes.split(',');

      if (selectedMenus.includes("ALL")) {
        return true;
      } else if (selectedMenus.includes(menuDetailsCode)) {
        return true;
      } else {
        return false;
      }
    } else {
      //console.warn("No employee selected.");
      return undefined;
    }
  }

  deleteEmployee(employee: UserViewModel) {
    //this.selectedEmployee = employee;
    // Open delete modal
    //this.deleteModal.nativeElement.show();
    this.action = 'delete';
    this.modalTitle = 'Delete Employee';
    this.deleteModal.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.showConfirmationModal = false;
    this.editModal.nativeElement.style.display = 'none'; // Hide the modal
  }
  closeDeleteModal() {
    this.deleteModal.nativeElement.style.display = 'none';
  }
  private isFirstExecution = true;
  getSelectedMenus(e: any) {
    let menuArray = this.menusForm.get('selectedMenus') as FormArray;

    // Add menu items from this.selectedEmployee.UserMenuDetails.AssingedMenuCodes if it exists
    if (this.isFirstExecution && this.selectedEmployee) {
      const selectedMenus = this.selectedEmployee.UserMenuDetails.AssingedMenuCodes.split(',');
      selectedMenus.forEach(menuCode => {
        if (!menuArray.value.includes(menuCode.trim())) {
          menuArray.push(new FormControl(menuCode.trim()));
        }
      });
      this.isFirstExecution = false; 
    }
   
    // Remove the unchecked menu item from the menuArray if it exists
    if (!e.target.checked) {
      let i = 0;
      menuArray.controls.forEach((menu: any) => {
        if (menu.value === e.target.value) { // Compare the value of the FormControl
          menuArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    // Add the newly checked menu item to the menuArray
    if (e.target.checked) {
      menuArray.push(new FormControl(e.target.value));
    }



    // Update the selected menu string
    this.selecteMenuString = menuArray.value.join(',');
    console.log("Selected Menus from Edit", this.selecteMenuString);
  }
  sort(column: string) {
    this.filteredEmployeesList.sort((a, b) => {
      // Using type assertion to explicitly tell TypeScript that the properties being accessed are of type 'any'
      const valueA = (a as any)[column];
      const valueB = (b as any)[column];

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }

  UpdateEmployee() {
    this.submitted = true;
    if (this.employeeform.invalid) {
      return;
    }
    const userDetailsString = this.sessionService.retrieve("_userDetails");
    const userviewModel: UserViewModel = JSON.parse(userDetailsString);
    const userid = userviewModel.UserId;
    let empDetails: UserViewModel = {
      UserId: this.selectedEmployee?.UserId??'',
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
      modifiedBy: userid, // Initially empty
      modifiedAt: new Date(), // Initially set to the creation timestamp      
    };
    //console.log(this.employeeform.value);
    this.authService.UpdateExisingEmployee(empDetails).subscribe({
      next: (response: any) => {
        //console.log('Employee Updated successfully:', response);
        this.toastr.success('Employee Details updated Successfully', 'Success');
        this.resetForm();
        this.closeModal();
        this.loadAllEmployees(); // Refresh the grid
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error);
        this.toastr.error('There was an error Saving employee Details', 'Error');
        return []// Handle error here
      }
    });
  }

  // Function to manually reset the form
  resetForm() {
    this.employeeform.reset();
    Object.keys(this.employeeform.controls).forEach(key => {
      this.employeeform.controls[key].setErrors(null);
    });
  }

  confirmDelete() {
    // Perform deletion logic here
    // After successful deletion, close the modal and refresh the employee list    
    this.deleteModal.nativeElement.style.display = 'block';
    this.authService.deleteExistingEmployee(this.employeeform.get('UserBasicDetails.userid')?.value).subscribe({
      next: (response: any) => {
        //console.log('Employee deleted successfully:', response);
        this.toastr.success('Employee Details deleted Successfully', 'Success');
        this.resetForm();
        this.closeDeleteModal();
        this.loadAllEmployees(); // Refresh the grid
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting employee:', error);
        this.toastr.error('There was an error deleting employee Details', 'Error');
        return []// Handle error here
      }
    });
  }
}
