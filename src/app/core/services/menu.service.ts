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
    //console.log(API_URL + 'v1/Menu');
    return this.http.get<MenuViewModel>(`${API_URL}v1/Menu/GetAllMenus`)
  }

  getMenusForLoggedInUser(userid:string): Observable<MenuViewModel> {    
    return this.http.get<MenuViewModel>(`${API_URL}v1/Menu/GetAllMenusforUser?userid=${userid}`);
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
