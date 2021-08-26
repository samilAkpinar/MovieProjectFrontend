import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormService } from 'src/app/services/form.service';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';
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

  constructor(
    private formService : FormService,
    private sidebarMenu : SidebarMenuService,
    private route:Router,
    private snackbarService: SnackbarService
    ) { }

  ngOnInit(): void {
    
    this.emailSend();
    this.status = true;
    this.signUpStatus = false;

    if(localStorage.getItem("jwt-token") != null && localStorage.getItem("session") != null ){
      
      this.route.navigate(['/home']);
      this.snackbarService.createSnackbar('success',"Login successful")

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

  }

  //login button.
  createTokenButton():any {

    
    var movieToken = localStorage.getItem("movie_token");
    
    //local storage da 
    if( movieToken != null){
      this.formService.createSession(movieToken).subscribe(data => {
        var obj = JSON.parse(data);

        //console.log("session success değeri",obj);
        
        if(obj.success == true){
          
          localStorage.setItem("session",obj.session_id);

          this.route.navigate(['/home']);
          this.snackbarService.createSnackbar('success',"Login successful")
          
        }else{

          this.snackbarService.createSnackbar('error',"Login failed")
        }

      });
      
      return 1;
    }

    //email ve şifre değerini backend alanına gönderir.
    //sonuç burada döner.
    this.formService.authenticate().subscribe(value => {

      if(value.isSuccess == false){
        
        this.snackbarService.createSnackbar('error',"Invalid email and password")
        return value;
      }

      //create movie token
      this.formService.createMovieToken().subscribe(data => {
        
        //console.log("Movie token value: " , data.request_token);
        localStorage.setItem("movie_token",data.request_token);
       
        //email validation
        this.formService.validationEmail(data.request_token).subscribe(email => {
          
          //string value
          var obj = JSON.parse(email);

          if(obj.data){
            this.snackbarService.createSnackbar('success',"Your email send")
            

          }else{

            this.snackbarService.createSnackbar('error',"Your email didn't send")
            
          }

        });
      });

      
      localStorage.setItem("name-surname",value.data.name +" "+ value.data.surname)
      localStorage.setItem("email",value.data.email);

      localStorage.setItem("jwt-token",value.data.token); 

    });

    return 0;
  }

  SignUpPageShow(){
    this.signUpStatus = true;
  }
}
