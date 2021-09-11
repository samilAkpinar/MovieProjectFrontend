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
      this.route.navigate(['/home']);
    }

  }

  loginPageShow(){
    this.status = true;
  }

  forgotPasswordPageShow() {
    this.status = false;
  }

  //forgot password
  emailSend():void{

    this.showSpinner = true;

    this.formService.sendEmail().subscribe(value =>{

      if(value.data){

        this.snackbarService.createSnackbar("info","Email sent successfully");
      }else{
        
        this.snackbarService.createSnackbar("info","Failed to send email");
      }

    });
    this.showSpinner = false;
  }

  //login button.
  createTokenButton():any {

    this.showSpinner = true;

    this.formService.authenticate().subscribe(value => {

      
      if(value.isSuccess == false){

        this.snackbarService.createSnackbar('error',"Invalid email and password")
        this.showSpinner = false;
        return value;
      
      }

      //create movie token
      this.formService.createMovieToken().subscribe(data => {
        
        //console.log("Movie token value: " , data.request_token);
       
       this.formService.createSessionWithLogin(data.request_token).subscribe(sessionWithLogin =>{
        
        //console.log("session with login değeridir: ",sessionWithLogin.data.request_token);
      
        this.formService.createSession(sessionWithLogin.data.request_token).subscribe(session =>{

          //session üretilmiştir.
          var obj = JSON.parse(session);

        //console.log("session success değeri",obj);
        
        if(obj.success == true){
          
          localStorage.setItem("session",obj.session_id);

          this.snackbarService.createSnackbar('success',"Login successfully")
          this.route.navigate(['/home']);
        
        }else{

          this.snackbarService.createSnackbar('error',"Login failed")
        }

        

        });
       });
        
      });

      this.showSpinner = false;
      localStorage.setItem("name-surname",value.data.name +" "+ value.data.surname)
      localStorage.setItem("email",value.data.email);
      localStorage.setItem("jwt-token",value.data.token); 

    });
  }

  SignUpPageShow(){
    this.signUpStatus = true;
  }

  signUp(){
    this.showSpinner = true;

    this.formService.signUp().subscribe(data => {

      //console.log("kullanıcı kayıt sonucu ", data);

      if(data.isSuccess){

        this.snackbarService.createSnackbar('info','User save')
        
      }else{

        this.snackbarService.createSnackbar('error',"User didn't save")
      }

      this.showSpinner = false;
      
    });
  }
}
