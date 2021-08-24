import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(
    private movie:MovieService,
    private route:ActivatedRoute
    ) { }

    movieId!:number;
    getMovie:any;
    genres:any;
    sessionId:any = localStorage.getItem("session");
    userVote:any;
    
    
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.movieId = id;

    this.movie.getMovieById(id).subscribe(value => {
      //console.log("get movie by id: ", value.data);

      this.getMovie = value.data;

      this.genres = value.data.genres;
    })


    //get-vote- işlemi ile kullanıcının verdiği puan buradan alınır.
    //bunun için film token session değerleri alınması gereklidir.
    
    console.log("session ", this.sessionId);
    
    this.movie.getUserVote(id, this.sessionId).subscribe(value => {
      
      if(!value.rated){
        this.userVote = "-";

      }else {

        this.userVote = value.rated.value;
      }
    });

  }


  //inputa girilen değeri backente kayıt eder.
  sendVoteMovie() {
    this.movie.putVotedMovie(this.movieId,this.sessionId).subscribe(data => {

      console.log("vote data: "+data.success)

      if(data.success){

        this.movie.getUserVote(this.movieId, this.sessionId).subscribe(value => {
      
          if(!value.rated){
            this.userVote = "-";
    
          }else {
    
            this.userVote = value.rated.value;
          }
        });

      }else{
        console.log("filme not verilememiştir.")
      }

    });
  }

}
