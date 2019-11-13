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
  activeGames;

  constructor(public rest:UserMgmtService, private route: ActivatedRoute, private router: Router) { 

  	this.firstName = sessionStorage.getItem("name");
    this.activeGames = [];
  }

  ngOnInit() {  
    this.getActiveGamesForUser();	
  }

  public logout() {
  	sessionStorage.clear();
  	this.router.navigate(['/login']);
  }

  public goToTTT() {
    var data = {"player1": sessionStorage.getItem("email"), "player2":"ai@ai.com", "gameId":1}
    this.router.navigate(['/ttt']);  	
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

}
