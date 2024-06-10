import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from 'src/app/core/constants/Api.constants';
import { Observable, throwError } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { UserViewModel } from 'src/app/core/ViewModels/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false; // Initialize isAuthenticated to false
  constructor(private http: HttpClient) { }


  // This function validates user credentials and updates isAuthenticated accordingly
  validateUserDetails(username: string, password: string) {
    return this.http.get<UserViewModel>(`${API_URL}v1/User/ValidateUser?username=${username}&password=${password}`).pipe(
      map(response => {
        //console.log("Status Response Received:", response.status);
        // Assuming response structure contains a boolean flag indicating authentication status
        this.isAuthenticated = true; // Adjust based on the actual response structure
        return response; // Pass the response to the subscriber
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        this.isAuthenticated = false;
        return throwError(error); // Propagate the error to the subscriber
      })
    );
  }

  // This function returns the current authentication status
  getIsAuthenticated(): boolean {
    //console.log("The Value of Authenticated is ", this.isAuthenticated)
    return this.isAuthenticated;
  }

  //  insert New  employee
  InsertNewEmployeeDetails(employeeDetails: UserViewModel): Observable<UserViewModel> {
    //console.log("Employee Details submitted to API", employeeDetails);
    return this.http.post<UserViewModel>(`${API_URL}v1/User`, employeeDetails)
  }

  // Get All Employess

  getAllEmployes(): Observable<UserViewModel[]> {
    return this.http.get<UserViewModel[]>(`${API_URL}v1/User/GetAllEmployees`)
      .pipe(
        catchError(error => {
          //this.errorMessage = 'Error loading employees: ' + error.message;
          console.error('Error:', error);
          return EMPTY; // Use EMPTY observable instead of throwError
        })
      );
  }

  //  insert New  employee
  UpdateExisingEmployee(employeeDetails: UserViewModel): Observable<UserViewModel> {
    console.log("Employee Details submitted to API", employeeDetails);
    return this.http.put<UserViewModel>(`${API_URL}v1/User/UpdateExistingEmployee`, employeeDetails)
  }

  deleteExistingEmployee(userid: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}v1/user/DeleteExistingEmployee?userid=${userid}`);
  }

  changePassword(userid: string, username: string, currentPassword: string, newPassword: string) {
    const body = {}; // or you can create a specific object if needed
    return this.http.put<any>(`${API_URL}v1/User/ChangePassword?userid=${userid}&username=${username}&tempPassword=${currentPassword}&currentPassword=${newPassword}`, body);
  }
}
