import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import { UserMgmtService } from '../../services/user-mgmt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
   registerForm = new FormGroup({
	    firstname: new FormControl('', [
	      Validators.required
	    ]),
	    lastname: new FormControl('', [
	      Validators.required
	    ]),
	    email: new FormControl('', [
	      Validators.required
	      
	    ]),
	    password: new FormControl('', [
	      Validators.required,
	      Validators.minLength(8)
	    ]),
	    confirmPassword:new FormControl('', [
	      Validators.required,
	      Validators.minLength(8)
	    ])
  });

  constructor(public rest:UserMgmtService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
  	console.log('THIS IS WHATS REGISTERING',this.registerForm.value);
  	this.rest.registerUser(this.registerForm.value).subscribe((res) => {
  		alert("Account Created Successfully!!");
  		
  	}, (err) => {
  		console.log("Oops", err);
  	});
  }

}