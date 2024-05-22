import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../constants/Api.constants';
import { MenuViewModel } from '../ViewModels/menu.viewmodel';
import { UserViewModel } from '../ViewModels/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }


  getAllMenus(): Observable<MenuViewModel> {
    console.log(API_URL + 'v1/Menu');
    return this.http.get<MenuViewModel>(`${API_URL}v1/Menu`)
  }

  InsertNewEmployeeDetails(employeeDetails: UserViewModel): Observable<UserViewModel> {
    console.log("Employee Details submitted to API", employeeDetails);
    return this.http.post<UserViewModel>(`${API_URL}v1/User`, employeeDetails)
  }
  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
