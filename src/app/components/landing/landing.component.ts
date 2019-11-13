import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  firstName: string;

  constructor(private route: ActivatedRoute, private router: Router) { 

  	this.firstName = sessionStorage.getItem("name")
  }

  ngOnInit() {  	
  }

  public logout(){
  	sessionStorage.clear();
  	this.router.navigate(['/login']);
  }

}
