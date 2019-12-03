import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://silo.cs.indiana.edu:52112/';
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

  // Service to login a user
  loginUser(user): Observable<any> {
  	return this.http.post<any>(endpoint+'login', JSON.stringify(user), httpOptions)
  			.pipe(
  					tap((user) => console.log('[LogIn] Success!'))
  				);
  }

  // Service to add a new game session
  startNewSession(session): Observable<any> {
    console.log("[SERVICE] Starting a new game session", session);
    return this.http.post<any>(endpoint+'newSession', JSON.stringify(session), httpOptions)
        .pipe(
            tap((res) => console.log('Game started!! ID=',res))
          );
  }

  // Serviice to save board state
  saveBoardState(bs): Observable<any> {
    console.log("[SERVICE] SAVING BOARD", bs);
    return this.http.post<any>(endpoint+'storeBoardState', JSON.stringify(bs), httpOptions)
        .pipe(
            tap((res) => console.log('Added new entry to ttt_moves with ID =',res))
          );
  }

  // Service to delete all moves for a session
  deleteMoves(sessionId): Observable<any> {
    console.log("[SERVICE] DELETING Moves", sessionId);
    return this.http.post<any>(endpoint+'deleteTTTMoves/'+sessionId, httpOptions)
        .pipe(
            tap((res) => console.log('Deleted all moves for session id=',sessionId))
          );
  }

  // Service to delete a session
  deleteActiveSession(sessionId): Observable<any> {
    console.log("[SERVICE] DELETING ENTIRE SESSION!", sessionId);
    return this.http.post<any>(endpoint+'deleteSession/'+sessionId, httpOptions)
        .pipe(
            tap((res) => console.log('Deleted session id=',sessionId))
          );
  }

  // Service to get all active games for user, given p1 email
  getAllActiveSessions(p1): Observable<any> {
    console.log("[SERVICE] Getting active games for", p1);
    return this.http.get<any>(endpoint+'getAllActiveSessions/'+p1, httpOptions)
        .pipe(
            tap((res) => {
              return res;
            })
          );
  }


  // Service to get board state for session
  getLatestBoard(sessionId): Observable<any> {
    console.log("[SERVICE] Getting board for", sessionId);
    return this.http.get<any>(endpoint+'getLatestBoardState/'+sessionId, httpOptions)
        .pipe(
            tap((res) => {
              var string_board = res[0]["board_state"];
              console.log("[SERVICE] board!!", string_board)
              return JSON.parse(string_board);
            })
          );
  }

  // Gets all users
  getAllRegisteredUsers(): Observable<any> {
    console.log("[SERVICE] Getting Registered Users");
    var loggedInUserEmail = sessionStorage.getItem('email');
    return this.http.get<any>(endpoint+'listUsers/'+loggedInUserEmail, httpOptions)
        .pipe(
            tap((res) => {
              return res;
            })
          );
  }


}
