import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/Api.constants';
import { HttpClient } from '@angular/common/http';
import { UserTypeViewModel } from 'src/app/core/ViewModels/usertype.viewmodel';
import { catchError, map } from 'rxjs/operators';
import { throwError,Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsertypeService {
  constructor(private httpClient : HttpClient) { }

  userTypes : UserTypeViewModel[]=[];
  

  GetAllUserTypes(){
    return this.httpClient.get<UserTypeViewModel>(`${API_URL}v1/UserType/LoadAllUserTypes`).pipe(
      map((data: UserTypeViewModel) => {
        // Handle successful response
        console.log('User Type Data received:', data);
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
