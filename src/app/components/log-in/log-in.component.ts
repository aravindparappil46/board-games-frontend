import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import { UserMgmtService } from '../../services/user-mgmt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm = new FormGroup({
	    email: new FormControl('', [
	      Validators.required
	    ]),
	   
	    password: new FormControl('', [
	      Validators.required,
	      Validators.minLength(8)
	    ])
  });

  constructor(public rest:UserMgmtService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
  	console.log('LOGGING IN WITH',this.loginForm.value);
  	this.rest.loginUser(this.loginForm.value).subscribe((res) => {
  		if(res.length > 0)
  			this.router.navigate(['/landing'], {state: {data: res}});
  		else
  			alert("Incorrect credentials!! Try again!")
  			
  		
  	}, (err) => {
  		console.log("Oops", err);
  	});
  }

}
