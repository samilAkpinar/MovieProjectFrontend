import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }
  
  token:any = localStorage.getItem("jwt-token");
  
  getAllMovieList():Observable<any> {

    return this.http.get("https://localhost:44389/api/v1/movies/get-populer-movie?page=1", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }


  getMovieById(movieId:number):Observable<any> {
    return this.http.get("https://localhost:44389/api/v1/movies/get-movie-by-id?movie_id="+movieId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }
}
