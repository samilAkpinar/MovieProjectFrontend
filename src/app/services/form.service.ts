import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSession } from '../models/CreateSession';
import { ResetPassword } from '../models/ResetPassword';
import { SessionWithLogin } from '../models/sessionWithLogin';
import { SignUp } from '../models/SignUp';
import { User } from '../models/User';
import { ValidationEmail } from '../models/ValidationEmail';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient,
    private snacbar : SnackbarService
    
    ) { }

  TxtName:string="";
  TxtSurname:string="";
  TxtEmail:string ="";
  TxtPassword:string="";

  addEmail(email:string) {
    this.TxtEmail = email;
  }

  addPassword(password:string){
    this.TxtPassword = password;
  }

  addName(name:string){
    this.TxtName = name;
  }

  addSurname(surname:string){
    this.TxtSurname = surname;
  }

  sendEmail():Observable<any> {
    
    return this.http.get("https://localhost:44389/api/v1/authentication/reset-password?email="+this.TxtEmail);
  }

  sendNewPassword(email:string):Observable<any>{

    
    const reset = new ResetPassword();
    reset.email = email;
    reset.password = this.TxtPassword;

    return this.http.post("https://localhost:44389/api/v1/authentication/update-password",reset); 
  }

  signUp():Observable<any> {

      const signUp = new SignUp(0,this.TxtName,this.TxtSurname,this.TxtEmail,this.TxtPassword,3);
      return this.http.post("https://localhost:44389/api/v1/authentication/register",signUp)
    
          
  }

  authenticate():Observable<any> {

      const user = new User(1,"","",this.TxtEmail,this.TxtPassword,"","",3);

      //create jwt token
      return this.http.post("https://localhost:44389/api/v1/authentication/authenticate",user);
    
  }

  createMovieToken():Observable<any> {

    //create movie token
    return this.http.get("https://localhost:44389/api/v1/authentication/create-token");
  }

  createSessionWithLogin(request_token:string):Observable<any> {

    const sessionWithLogin = new SessionWithLogin();
    sessionWithLogin.username = "samilakpinar";
    sessionWithLogin.password = "Ad15091978"
    sessionWithLogin.request_token = request_token;

    return this.http.post("https://localhost:44389/api/v1/authentication/create-session-with-login",sessionWithLogin);
  }

  

  validationEmail(token:string):Observable<any>{

    const validationEmail = new ValidationEmail;
    validationEmail.email = this.TxtEmail;
    validationEmail.token = token;

    const headers = { 'content-type': 'application/json'}
    return this.http.post("https://localhost:44389/api/v1/authentication/validation-email",validationEmail,{'headers':headers, responseType: 'text'})
  }

  createSession(token:string):Observable<any>{
    
    const createSession = new CreateSession;
    createSession.request_token = token;

    const headers = { 'content-type': 'application/json'}
    return this.http.post("https://localhost:44389/api/v1/authentication/create-session",createSession,{'headers':headers, responseType: 'text'})

  }

}
