import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSession } from '../models/CreateSession';
import { User } from '../models/User';
import { ValidationEmail } from '../models/ValidationEmail';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  TxtEmail:string ="";
  TxtPassword:string="";

  addEmail(email:string) {
    this.TxtEmail = email;
  }

  addPassword(password:string){
    this.TxtPassword = password;
  }

  authenticate():Observable<any> {

    const user = new User(1,"","",this.TxtEmail,this.TxtPassword,"","",0);

    //create jwt token
    return this.http.post("https://localhost:44389/api/v1/authentication/authenticate",user);

  }

  createMovieToken():Observable<any> {

    //create movie token
    return this.http.get("https://localhost:44389/api/v1/authentication/create-token");
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
