import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { FormService } from 'src/app/services/form.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-password-forgotten-forms',
  templateUrl: './password-forgotten-forms.component.html',
  styleUrls: ['./password-forgotten-forms.component.scss']
})
export class PasswordForgottenFormsComponent implements OnInit {

  spinner!: boolean; 

  constructor(
    private loginFunctions: LoginComponent,
    private formService: FormService,
    private snackbar: SnackbarService
  ) { 
    
  }

  ngOnInit(): void {
    this.spinner = false;
  }

  
  goToLoginPage(){

    this.loginFunctions.loginPageShow();
    //console.log("goToLoginPage");
  }

  //forgot password
  onSubmit(data:any) {

    this.spinner = true;
    console.log(data.email);
    
    this.formService.sendEmail(data.email).subscribe(value =>{

      console.log("send mail: ",value);

      if(value.result){

        this.snackbar.createSnackbar("info","Email sent successfully");
      }else{
        
        this.snackbar.createSnackbar("info","Failed to send email");
      }

    });
    this.spinner = false;


  }

}
