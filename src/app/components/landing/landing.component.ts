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

  constructor(public rest:UserMgmtService, private route: ActivatedRoute, private router: Router) { 

  	this.firstName = sessionStorage.getItem("name")
  }

  ngOnInit() {  	
  }

  public logout() {
  	sessionStorage.clear();
  	this.router.navigate(['/login']);
  }

  public goToTTT() {
    var data = {"player1": sessionStorage.getItem("email"), "player2":"ai@ai.com", "gameId":1}

    // this.rest.startNewSession(data).subscribe((res) => {
    //   sessionStorage.setItem("currSessionId", res);
    //   this.router.navigate(['/ttt']);
    // }, (err) => {
    //   console.log("Oops", err);
    //   alert("Something went wrong! Try again!")
    // });

    this.router.navigate(['/ttt']);
  	
  }

}
