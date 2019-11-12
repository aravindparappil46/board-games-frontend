import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
   registerForm = new FormGroup({
	    userName: new FormControl('', [
	      Validators.required
	    ]),
	    email: new FormControl('', [
	      Validators.required
	      
	    ]),
	    pwd: new FormControl('', [
	      Validators.required,
	      Validators.minLength(8)
	    ]),
	    confirmPwd:new FormControl('', [
	      Validators.required,
	      Validators.minLength(8)
	    ])
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  	console.log(this.registerForm.value);
  }

}