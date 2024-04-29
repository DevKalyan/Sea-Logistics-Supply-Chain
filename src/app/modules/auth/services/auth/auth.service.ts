import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from 'src/app/core/constants/Api.constants';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false; // Initialize isAuthenticated to false
  constructor(private http: HttpClient) { }


  // This function validates user credentials and updates isAuthenticated accordingly
  validateUserDetails(username: string, password: string): Observable<boolean> {
    return this.http.get<any>(`${API_URL}v1/User?username=${username}&password=${password}`).pipe(
      map(response => {
        console.log("Response Received:", response);
        this.isAuthenticated = true; // Adjust based on the actual response structure
        return this.isAuthenticated;
      }),
      catchError(error => {
        console.error('Error validating user details:', error);
        this.isAuthenticated = false;
        return of(false); // Return Observable<boolean> with false value in case of error
      })
    );
  }

  // This function returns the current authentication status
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
