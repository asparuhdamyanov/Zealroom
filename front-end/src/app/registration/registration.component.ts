import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {first} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isRegistrate = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.isRegistrate = false;
  }

  get fval() { return this.registerForm.controls; }

  onFormSubmit(){
    this.userService
      .register(this.registerForm.value)
      .subscribe(
      (data)=>{
        window.alert('User Registered successfully!');
      }
    );
    //window.location.reload();
    this.isRegistrate = true;
    this.router.navigate(['/registrate']);

  }

}
