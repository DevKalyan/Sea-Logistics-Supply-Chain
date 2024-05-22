import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/Api.constants';
import { HttpClient } from '@angular/common/http';
import { UserViewModel } from 'src/app/core/ViewModels/user.model';
import { catchError, map } from 'rxjs/operators';
import { throwError,Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsertypeService {
  constructor(private httpClient : HttpClient) { }

  userTypes : UserViewModel[]=[];
  

  GetAllUserTypes(){
    return this.httpClient.get<UserViewModel>(`${API_URL}UserType/LoadAllUserTypes`).pipe(
      map((data: UserViewModel) => {
        // Handle successful response
        //console.log('Data received:', data);
        return data;
      }),
      catchError(error => {
        // Handle error
        console.error('An error occurred:', error);
        return throwError(() => error); // Rethrow the error
      })
    );
  }
}
