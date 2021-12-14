import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { CreateSession } from '../models/CreateSession';
import { Login } from '../models/login';
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
    @Inject('apiUrl') private apiUrl: string,
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

  sendEmail(email:string):Observable<any> {
    
    return this.http.get(this.apiUrl +"/authentication/reset-password?email="+email);
  }

  sendNewPassword(email:string, password:string):Observable<any>{

    
    const reset = new ResetPassword();
    reset.email = email;
    reset.password = password;

    return this.http.post(this.apiUrl +"/authentication/update-password",reset); 
  }

  signUp(signUp: SignUp):Observable<any> {

      return this.http.post(this.apiUrl +"/authentication/register",signUp)
    
  }

  login(email:string, password:string):Observable<any> {

    
      const user = new User(1,"","",email,password,"","",3);
      //const user = new Login(email,password);

      //create jwt token
      return this.http.post(this.apiUrl +"/authentication/authenticate",user);
    
  }

  createMovieToken():Observable<any> {

    //create movie token
    return this.http.get(this.apiUrl +"/authentication/create-token");
  }

  createSessionWithLogin(request_token:string):Observable<any> {

    const sessionWithLogin = new SessionWithLogin();
    sessionWithLogin.username = "samilakpinar";
    sessionWithLogin.password = "Ad15091978"
    sessionWithLogin.request_token = request_token;

    return this.http.post(this.apiUrl +"/authentication/create-session-with-login",sessionWithLogin);
  }

  

  validationEmail(token:string):Observable<any>{

    const validationEmail = new ValidationEmail;
    validationEmail.email = this.TxtEmail;
    validationEmail.token = token;

    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.apiUrl +"/authentication/validation-email",validationEmail,{'headers':headers, responseType: 'text'})
  }

  createSession(token:string):Observable<any>{
    
    const createSession = new CreateSession;
    createSession.request_token = token;

    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.apiUrl +"/authentication/create-session",createSession,{'headers':headers, responseType: 'text'})

  }

  loggedIn(){
    return localStorage.getItem("jwt-token");
  }

}
