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

     //console.log("movie ",value);

      if(value.result){

        this.movieVideo = value.data[0];
        this.youtubeKey = this.youtubeKey + this.movieVideo.key;
        //console.log("movie , ", this.youtubeKey);
      
      }else{

        this.snackbar.createSnackbar("error","Movie Video didn't access")
      }

    });

    //get movie by id
    this.movie.getMovieById(id).subscribe(value => {
     //console.log("get movie by id: ", value.data);
     
     if(value.result){

      this.getMovie = value.data;
      this.genres = value.data.genres;

     }else {
      this.snackbar.createSnackbar("error","Movie didn't get");
     }

      this.showSpinner = false;

    })

    
    this.movie.getUserVote(id, this.sessionId).subscribe(value => {
      
      //console.log("deneme", value.data );
      var rateValue = JSON.parse(value.data);

      //console.log("vaot. ", rateValue.rated.value)

      if(value.result){

        this.userVote = rateValue.rated.value;

      }else {
          
        this.userVote = "-";
      }
    });

  }


  //inputa girilen değeri backente kayıt eder.
  sendVoteMovie() {
    this.showWoteSpinner = true;

    this.movie.putVotedMovie(this.movieId,this.sessionId).subscribe(data => {

      //console.log("vote data: ", data)

      if(data.result){

        this.movie.getUserVote(this.movieId, this.sessionId).subscribe(value => {
      
          if(value.result){

            var jsonResult = JSON.parse(value.data);

            this.userVote = jsonResult.rated.value;
            this.ngOnInit();
            this.showWoteSpinner = false;
            
          }else {
    
            this.userVote = "-";
            this.showWoteSpinner = false;
          }
        });

      }else{
        this.userVote = "-";
        this.showWoteSpinner = false;
      }

    });
  }

}
