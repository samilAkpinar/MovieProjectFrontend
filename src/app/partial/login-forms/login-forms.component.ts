import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { FormService } from 'src/app/services/form.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.scss']
})
export class LoginFormsComponent implements OnInit {

  spinner!: boolean; 
  
  constructor(
    private loginFunctions: LoginComponent,
    private formService: FormService,
    private snackbar : SnackbarService,
    private route : Router
  ) {  }
  

  ngOnInit(): void {
    this.spinner = false;
  }

  
  onSubmit(data:any):void {
    this.spinner = true;

    //required yapısını olmalı
    if(data.email.length == 0 || data.password.length < 8){
      this.snackbar.createSnackbar("error","Invalid email or password");
      this.spinner = false;
      return;
    }
    
    this.formService.login(data.email, data.password).subscribe(value => {
      
      //console.log(value);

      if(value.result == false){

        this.snackbar.createSnackbar('error',"Error, Invalid email and password")
        this.spinner = false;
        return value.result;
      
      }
      
      localStorage.setItem("jwt-token",value.data.token); 
      localStorage.setItem("name-surname",value.data.name +" "+ value.data.surname)
      localStorage.setItem("email",value.data.email);


      this.formService.createMovieToken().subscribe(getData => {
        
        if(!getData.result){
          this.snackbar.createSnackbar("error","Something went wrong, Please try again later");
          this.spinner = false;
          return value.result;
        }

        var jsonData = JSON.parse(getData.data);
       
       this.formService.createSessionWithLogin(jsonData.request_token).subscribe(sessionWithLogin => {

        //console.log("session with login: ",sessionWithLogin.data.request_token);
        
        if(!sessionWithLogin.result){
          this.snackbar.createSnackbar("error","Something went wrong, Please try again later");
          this.spinner = false;
          return sessionWithLogin.result;
        }

        this.formService.createSession(sessionWithLogin.data.request_token).subscribe(session =>{
          var jsonSession = JSON.parse(session);

          //console.log("session json",jsonSession);
        
        
        if(jsonSession.result){

          var jsonData = JSON.parse(jsonSession.data);
          
          localStorage.setItem("session", jsonData.session_id);

          this.snackbar.createSnackbar('success',"Login successfully")
          this.route.navigate(['/home/upcoming']);
                  
        }else{

          this.snackbar.createSnackbar('error',"Login failed")
          this.spinner = false;
        }

        });

       });

      });

    });

  }

  goToForgotPasswordPage(){
    
    this.loginFunctions.forgotPasswordPageShow();
    //console.log("goToForgotPasswordPage");
  }

  goToSignUpPage(){

    this.loginFunctions.SignUpPageShow();
    //console.log("goToSignUpPage");
  }

}
