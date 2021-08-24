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

    if(localStorage.getItem("jwt-token") != null ){
      
      this.route.navigate(['/home']);
    }

  }

  loginPageShow(){
    this.status = true;
  }

  forgotPasswordPageShow() {
    this.status = false;
  }

  message:any;
  nonce:any;
  path:any;
  privateKey:any;


  emailSend():void{

  }

  //login butonudur.
  createTokenButton():any {

    //Bu jwt token olacak.
    var token = localStorage.getItem("jwt-token");
    
    //local srorage da jwt token var 
    if( token != null){
      this.formService.createSession(token).subscribe(data => {
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

      console.log("jwt token değeri", value);
      
      localStorage.setItem("name-surname",value.data.name +" "+ value.data.surname)
      localStorage.setItem("email",value.data.email);

      if(value.isSuccess == false){
        
        console.log("Email veya şifre hatalı");
        return value;
      }

      localStorage.setItem("jwt-token",value.data.token); 
    
      this.route.navigate(['/home']);
     

    });

    return 0;
  }
}
