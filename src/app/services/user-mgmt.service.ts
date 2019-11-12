import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserMgmtService {
  
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
	  let body = res;
	  return body || { };
  }

  // Service to register a user
  registerUser(user): Observable<any> {
  	console.log("[SERVICE] registering", user);
  	return this.http.post<any>(endpoint+'register', JSON.stringify(user), httpOptions)
  			.pipe(
  					tap((user) => console.log('Added'))
  				);
  }


}
