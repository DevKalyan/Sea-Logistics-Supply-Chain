import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { API_URL, COUNTRY_URL } from 'src/app/core/constants/Api.constants';
import { EmailViewModel } from '../../viewmodels/email.viewmodel';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }


  getAllCountries(): Observable<any> {
    return this.httpClient.get<any>(`${COUNTRY_URL}`).pipe(
      map((countries: any) => {
        // Handle successful response
        console.log('Countries received:', countries);
        return countries;
      }),
      catchError(error => {
        // Handle error
        console.error('An error occurred:', error);
        return throwError(() => error); // Rethrow the error
      })
    );
  }

  sendEmail(emailparam: EmailViewModel): Observable<EmailViewModel> {
    return this.httpClient.post<EmailViewModel>(`${API_URL}v1/Email/send`, emailparam);
  }
}
