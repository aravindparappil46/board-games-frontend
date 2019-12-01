import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMgmtService } from '../../services/user-mgmt.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  firstName: string;
  loggedInUserEmail: string;
  activeGames;
  isMultiplayer: boolean;
  registeredUsers;

  constructor(public rest:UserMgmtService, private route: ActivatedRoute, private router: Router) { 

  	this.firstName = sessionStorage.getItem("name");
    this.loggedInUserEmail = sessionStorage.getItem("email");
    this.activeGames = [];
    this.registeredUsers = [];
    this.isMultiplayer = false;
  }

  ngOnInit() {  
    this.getActiveGamesForUser();	
  }

  public logout() {
  	sessionStorage.clear();
  	this.router.navigate(['/login']);
  }

  public goToTTT() {
    this.router.navigate(['/ttt']);  	
  }

  public chooseOpponent(){
    this.rest.getAllRegisteredUsers().subscribe((res) => {
      this.registeredUsers = res;
      this.isMultiplayer = true;

    }, (err) => {
      console.log("Failed to get Registered Users", err);
    });
  }

  public goToTTTHuman(p2email, firstname){
    sessionStorage.setItem("opponentName", firstname);
    this.router.navigate(['/ttt'], {queryParams:{opponent: p2email}});
  }

  public goToDotbox() {
    this.router.navigate(['/dotbox']);    
  }

  public getActiveGamesForUser(){
    var email = sessionStorage.getItem("email");
    this.rest.getAllActiveSessions(email).subscribe((res) => {
      this.activeGames = res;
      console.log(this.activeGames)
    }, (err) => {
      console.log("Failed to get Active Games", err);
    });
  }

  public resumeGame(sessionId, player1, player2) {
    sessionStorage.setItem("currSessionId", sessionId);
    if(player1 != this.loggedInUserEmail)
      var opponentEmail = player1
    else
      var opponentEmail = player2
    
    console.log("OPP", opponentEmail)
    if (opponentEmail != 'ai@ai.com') {
      sessionStorage.setItem("opponentName", player2);
      this.router.navigate(['/ttt'], {state: {data: {isResumingGame: true}}, queryParams:{opponent:opponentEmail}});
    }
    else
        this.router.navigate(['/ttt'], {state: {data: {isResumingGame: true}}});
  }

}
