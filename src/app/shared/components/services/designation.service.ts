import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DesignationViewModel } from 'src/app/core/ViewModels/designation.viewmodel';
import { API_URL } from 'src/app/core/constants/Api.constants';
import { catchError, map } from 'rxjs/operators';
import { throwError,Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private httpClient : HttpClient) { }

  _designtation : DesignationViewModel

  getAllDesignationDetails(): Observable<DesignationViewModel> {
    return this.httpClient.get<DesignationViewModel>(`${API_URL}Designation/LoadAllDesignations`).pipe(
      map((data: DesignationViewModel) => {
        // Handle successful response
        console.log('Data received:', data);
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

