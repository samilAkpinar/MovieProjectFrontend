import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private http:HttpClient) { }

  token:any = localStorage.getItem("jwt-token");
  
  getAllCastList():Observable<any> {

    return this.http.get("https://localhost:44389/api/v1/cast/get-populer-cast?movieId=550", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }
}
