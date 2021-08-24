import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormService } from 'src/app/services/form.service';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  status!: boolean;
  token!: string;
  user:any;

  constructor(
    private formService : FormService,
    private sidebarMenu : SidebarMenuService,
    private route:Router
    ) { }

  ngOnInit(): void {
    
    this.emailSend();
    this.status = true;

    if(localStorage.getItem("jwt-token") != null && localStorage.getItem("session") != null ){
      
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

  }

  //login button.
  createTokenButton():any {

    
    var movieToken = localStorage.getItem("movie_token");
    
    //local storage da 
    if( movieToken != null){
      this.formService.createSession(movieToken).subscribe(data => {
        var obj = JSON.parse(data);

        console.log("session success değeri",obj);
        
        if(obj.success == true){
          
          localStorage.setItem("session",obj.session_id);

          this.route.navigate(['/home']);
          
        }else{
          console.log("kullanıcı giriş hata oluştu.")
        }

      });
      
      return 1;
    }

    //email ve şifre değerini backend alanına gönderir.
    //sonuç burada döner.
    this.formService.authenticate().subscribe(value => {

      if(value.isSuccess == false){
        
        console.log("Invalid email and password");
        return value;
      }

      //create movie token
      this.formService.createMovieToken().subscribe(data => {
        
        console.log("Movie token value: " , data.request_token);
        localStorage.setItem("movie_token",data.request_token);
       
        //email validation
        this.formService.validationEmail(data.request_token).subscribe(email => {
          
          //string value
          var obj = JSON.parse(email);

          if(obj.data){
            console.log("email send.");

          }else{

            console.log("Email didn't send");
          }

        });
      });

      
      localStorage.setItem("name-surname",value.data.name +" "+ value.data.surname)
      localStorage.setItem("email",value.data.email);

      localStorage.setItem("jwt-token",value.data.token); 

    });

    return 0;
  }
}
