import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { RateMovie } from '../models/rateMovie';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http:HttpClient,
    private snackbarService: SnackbarService
    ) { }
  
  token:any = localStorage.getItem("jwt-token");
  voteValue!:number;

  
  getAllMovieList(pageNumber:number):Observable<any> {
    
    return this.http.get(this.apiUrl +"/movies/get-populer-movie/"+pageNumber, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }


  getMovieById(movieId:number):Observable<any> {

    return this.http.get(this.apiUrl +"/movies/get-movie-by-id/"+movieId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }

  getUserVote(movieId:number, sessionId:string):Observable<any> {

    return this.http.get(this.apiUrl +"/movies/get-rate-movie?movieId="+movieId+"&sessionId="+sessionId+"&guestId=3", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
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
    

    if ( this.voteValue > 0 && this.voteValue < 11){

      this.snackbarService.createSnackbar("success","Your vote successfully update")
      return this.http.post(this.apiUrl +"/movies/rate-movie", rateMovie , {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
      
      
    }else{

      this.snackbarService.createSnackbar("error","Error, The entered value must be between 1 and 10")
       return empty();
    }

  }

  
  getUpcomingMovies(page:number):Observable<any> {
    
    return this.http.get(this.apiUrl +"/movies/upcoming-movies/"+page, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)})
  }

  getMovieVideoById(movieId:number):Observable<any>{

    return this.http.get(this.apiUrl +"/movies/get-movie-video-by-id?movieId="+movieId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.token)});
  
  }

}
