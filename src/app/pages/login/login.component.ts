import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SnackbarService } from 'src/app/services/snackbar.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  status!: boolean;
  signUpStatus!: boolean;
  token!: string;
  user:any;
  showSpinner: boolean = false;

  constructor(
    private formService : FormService,
    private route:Router,
    private snackbarService: SnackbarService
    ) { }

  ngOnInit(): void {
    
    this.status = true;
    this.signUpStatus = false;

    if(localStorage.getItem("session") != null ){
      this.route.navigate(['/home/upcoming']);
    }

  }

  loginPageShow(){
    this.status = true;
    this.signUpStatus = false;
  }

  forgotPasswordPageShow() {
    this.status = false;
  }

 

  SignUpPageShow(){
    this.signUpStatus = true;
  }

}
