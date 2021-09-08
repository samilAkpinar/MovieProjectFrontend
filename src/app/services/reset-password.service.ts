import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor() { }
  txtEmail:string = "";
  txtPassword:string = "";

  addPassword(password:string){
    this.txtPassword = password;
  }

  sendNewPassword(email:string){

    //yeni şifre gönderilimi yapılır.
  }

}
