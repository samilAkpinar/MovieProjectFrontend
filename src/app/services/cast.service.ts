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
    //550 id'li filmdeki oyuncuları getirir.
    return this.http.get("https://localhost:5001/api/v1/cast/get-populer-cast/550", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }

  getCastById(castId:number):Observable<any>{

    return this.http.get("https://localhost:5001/api/v1/cast/get-cast-by-id/550/"+castId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }
}
