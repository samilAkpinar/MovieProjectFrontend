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


  constructor(
    private formService : FormService,
    private sidebarMenu : SidebarMenuService,
    private route:Router
    ) { }

  ngOnInit(): void {

    this.status = true;

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
      if(value.isSuccess == false){
        
        console.log("Email veya şifre hatalı");
        return value;
      }
      //alınan jwt token değeri get-menu http ye istek atılır.
      localStorage.setItem("jwt-token",value.data.token); 
      console.log("giriş başarılı", value.data.token);

      console.log("giriş başarılı");

      //eğer giriş başarılı ise get-menuye istek atılır. token değeri gönderilir.
      // eğer get-menu true gelirse home sayfasına geçiş yapılır.
       
      this.route.navigate(['/home']);
     
      
        
        


    });

    return 0;
  }
}
