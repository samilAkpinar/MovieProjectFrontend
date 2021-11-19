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

  labelState!: boolean; //input focus durumundaki style değişimidir.
  value: string = "";//formdan gelen email ve şifre değerleridir.

  constructor(
    private loginFunctions: LoginComponent,
    private formService: FormService,
    private snackbar: SnackbarService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.labelState = false;
  }

  
  onFocus():void {
    this.labelState = true;
  }

  onBlur():any {

    this.labelState = false;
  }

  onSubmit(data:any) {
    
    //this.showSpinner = true;

    const signUp = new SignUp(0, data.name, data.surname, data.email, data.password, 3);
    
    this.formService.signUp(signUp).subscribe(data => {

      console.log("kullanıcı kayıt sonucu ", data);

      if(data.result){

        this.snackbar.createSnackbar('info','User save')
        this.router.navigate(['/login']);
        
      }else{

        this.snackbar.createSnackbar('error',"User didn't save")
      }

      //this.showSpinner = false;
      
    });

  }

  goToLoginPage(){
    this.loginFunctions.loginPageShow();
    //console.log("goToLoginPage");
  }

}
