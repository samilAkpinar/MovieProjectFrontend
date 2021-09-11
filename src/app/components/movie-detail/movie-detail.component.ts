import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

    movieId!:number;
    getMovie:any;
    genres:any;
    sessionId:any = localStorage.getItem("session");
    userVote:any;
    showSpinner: boolean = false;
    showWoteSpinner: boolean = false;
    movieVideo:any = []
    youtubeKey:string = "https://www.youtube.com/embed/";

  constructor(
    private movie:MovieService,
    private route:ActivatedRoute,
    private snackbar:SnackbarService
    ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.movieId = id;

    this.showSpinner = true;


    //get movie video by id
    this.movie.getMovieVideoById(id).subscribe(value =>{

      console.log("movie hata mıdır: ",value);

      if(value.isSuccess){

        this.movieVideo = value.data[0];
        this.youtubeKey = this.youtubeKey + this.movieVideo.key;
        console.log("denmee , ", this.youtubeKey);
      
      }else{

        this.snackbar.createSnackbar("error","Movie Video didn't access")
      }

      

    });

    //get movie by id
    this.movie.getMovieById(id).subscribe(value => {
     //console.log("get movie by id: ", value.data);

      this.getMovie = value.data;

      this.genres = value.data.genres;
      this.showSpinner = false;
    })

    
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
    this.showWoteSpinner = true;

    this.movie.putVotedMovie(this.movieId,this.sessionId).subscribe(data => {

      //console.log("vote data: "+data.success)

      if(data.success){

        this.movie.getUserVote(this.movieId, this.sessionId).subscribe(value => {
      
          if(!value.rated){
            this.userVote = "-";
    
          }else {
    
            this.userVote = value.rated.value;
            this.ngOnInit();
            this.showWoteSpinner = false;
          }
        });

      }else{
        this.userVote = "-";
      }

    });
  }

}
