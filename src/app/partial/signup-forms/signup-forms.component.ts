import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/SignUp';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { FormService } from 'src/app/services/form.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup-forms',
  templateUrl: './signup-forms.component.html',
  styleUrls: ['./signup-forms.component.scss']
})
export class SignupFormsComponent implements OnInit {

  spinner!: boolean; //button loading
  

  constructor(
    private loginFunctions: LoginComponent,
    private formService: FormService,
    private snackbar: SnackbarService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.spinner = false;
  }

 
  onSubmit(data:any) {
    
    this.spinner = true;

    const signUp = new SignUp(0, data.name, data.surname, data.email, data.password, 3);
    
    this.formService.signUp(signUp).subscribe(data => {

      console.log("kullanıcı kayıt sonucu ", data);

      if(data.result){

        this.snackbar.createSnackbar('info','User save')
        this.router.navigate(['/login']);
        this.spinner = false;
        
      }else{

        this.snackbar.createSnackbar('error',"User didn't save")
        this.spinner = false;
      }
      
    });

  }

  goToLoginPage(){
    this.loginFunctions.loginPageShow();
  }

}
