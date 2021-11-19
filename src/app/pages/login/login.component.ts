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

  /*

  //forgot password
  emailSend():void{

    this.showSpinner = true;

    this.formService.sendEmail().subscribe(value =>{

      //console.log("send mail: ",value);

      if(value.result){

        this.snackbarService.createSnackbar("info","Email sent successfully");
      }else{
        
        this.snackbarService.createSnackbar("info","Failed to send email");
      }

    });
    this.showSpinner = false;
  }
  */

  /*
  //login button. 
  createTokenButton():any {
    this.showSpinner = true;

    
    this.formService.authenticate().subscribe(value => {

      
      if(value.result == false){

        this.snackbarService.createSnackbar('error',"Error, Invalid email and password")
        this.showSpinner = false;
        return value.result;
      
      }
      
      localStorage.setItem("jwt-token",value.data.token); 
      localStorage.setItem("name-surname",value.data.name +" "+ value.data.surname)
      localStorage.setItem("email",value.data.email);
      

      //promise
      var p = new Promise(function(resolve,reject){
        
        if(localStorage.getItem("jwt-token")){

            resolve(value.data.token);
          }else{
            
            reject("Something went wrong");
          }
      });

      p.then(function(param:any){
        
        return true;

      }).catch(function(error){
        console.log(error);

      });

      
      //create movie token
      this.formService.createMovieToken().subscribe(getData => {
        
        //console.log("Movie token value: " , getData);

        if(!getData.result){
          this.snackbarService.createSnackbar("error","Something went wrong, Please try again later");
          this.showSpinner = false;
          return value.result;
        }

        var jsonData = JSON.parse(getData.data);
       
       this.formService.createSessionWithLogin(jsonData.request_token).subscribe(sessionWithLogin =>{
        
        console.log("session with login: ",sessionWithLogin.data.request_token);
        
        if(!sessionWithLogin.result){
          this.snackbarService.createSnackbar("error","Something went wrong, Please try again later");
          this.showSpinner = false;
          return sessionWithLogin.result;
        }
      
        this.formService.createSession(sessionWithLogin.data.request_token).subscribe(session =>{

          var jsonSession = JSON.parse(session);

          console.log("session json",jsonSession);
        
        
        if(jsonSession.result){

          var jsonData = JSON.parse(jsonSession.data);
          
          localStorage.setItem("session", jsonData.session_id);

          this.snackbarService.createSnackbar('success',"Login successfully")
          this.route.navigate(['/home/upcoming']);
                  
        }else{

          this.snackbarService.createSnackbar('error',"Login failed")
        }

        this.showSpinner = false;

        });
       });
        
      });

      this.showSpinner = false;
      

    });
  }

*/

  SignUpPageShow(){
    this.signUpStatus = true;
  }

  /*

  signUp(){
    this.showSpinner = true;

    this.formService.signUp().subscribe(data => {

      console.log("kullanıcı kayıt sonucu ", data);

      if(data.result){

        this.snackbarService.createSnackbar('info','User save')
        
      }else{

        this.snackbarService.createSnackbar('error',"User didn't save")
      }

      this.showSpinner = false;
      
    });
  }

  */
}
