import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateMovie } from '../models/rateMovie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }
  
  token:any = localStorage.getItem("jwt-token");
  voteValue!:number;

  
  getAllMovieList():Observable<any> {

    return this.http.get("https://localhost:44389/api/v1/movies/get-populer-movie?page=1", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }


  getMovieById(movieId:number):Observable<any> {

    return this.http.get("https://localhost:44389/api/v1/movies/get-movie-by-id?movie_id="+movieId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }

  getUserVote(movieId:number, sessionId:string):Observable<any> {

    return this.http.get("https://localhost:44389/api/v1/movies/get-rate-movie?movieId="+movieId+"&sessionId="+sessionId+"&guestId=3", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }

  addVoteValue(voteValue:number){
    this.voteValue = voteValue;
  }

  putVotedMovie(movieId:number, sessionId:string):Observable<any> {

    const rateMovie = new RateMovie();
    rateMovie.MovieId = movieId;
    rateMovie.SessionId = sessionId;
    rateMovie.GuestId = "";
    rateMovie.Value = this.voteValue;    
    rateMovie.Note = "";
    
    return this.http.post("https://localhost:44389/api/v1/movies/rate-movie", rateMovie , {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }
}
