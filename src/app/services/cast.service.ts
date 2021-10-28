import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http:HttpClient
    ) { }

  token:any = localStorage.getItem("jwt-token");
  
  getAllCastList():Observable<any> {
    //550 id'li filmdeki oyuncuları getirir.
    return this.http.get(this.apiUrl +"/cast/get-populer-cast/550", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }

  getCastById(castId:number):Observable<any>{

    return this.http.get(this.apiUrl +"/cast/get-cast-by-id/550/"+castId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }
}
