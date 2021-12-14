import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  token:any;
  

  getAllMovieList(pageNumber:number):Observable<any> {
    
    return this.http.get(this.apiUrl +"/movies/get-populer-movie/"+pageNumber, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.getToken())})
  }


  getMovieById(movieId:number):Observable<any> {

    return this.http.get(this.apiUrl +"/movies/get-movie-by-id/"+movieId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.getToken())})
  }

  getUserVote(movieId:number, sessionId:string):Observable<any> {

    return this.http.get(this.apiUrl +"/movies/get-rate-movie?movieId="+movieId+"&sessionId="+sessionId+"&guestId=3", {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.getToken())})
  }

  

  putVotedMovie(rating:number, movieId:number, sessionId:string):Observable<any> {

    
    const rateMovie = new RateMovie();
    rateMovie.MovieId = movieId;
    rateMovie.SessionId = sessionId;
    rateMovie.GuestId = "";
    rateMovie.Value = rating;    
    rateMovie.Note = "";
    

    return this.http.post(this.apiUrl +"/movies/rate-movie", rateMovie , {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.getToken())})
      
  }

  
  getUpcomingMovies(page:number):Observable<any> {
    
    return this.http.get(this.apiUrl +"/movies/upcoming-movies/"+page, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.getToken())})
  }

  getMovieVideoById(movieId:number):Observable<any>{

    return this.http.get(this.apiUrl +"/movies/get-movie-video-by-id/"+movieId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.getToken())});
  
  }

  getToken(): string {

    this.token = localStorage.getItem("jwt-token");
    return this.token;
  }

}
