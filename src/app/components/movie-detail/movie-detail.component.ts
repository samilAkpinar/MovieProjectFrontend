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
       

    //rating structure
    rating = 0;
    starCount = 10;
    ratingArr:  boolean[] = []; // true => solid; star; false => empty star

  constructor(
    private movie:MovieService,
    private route:ActivatedRoute,
    private snackbar:SnackbarService
    ) {
      this.ratingArr = Array(this.starCount).fill(false);
     }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.movieId = id;

    this.showSpinner = true;


    //get movie video by id
    this.movie.getMovieVideoById(id).subscribe(value =>{

      if(value.result){

        this.movieVideo = value.data[0];
        this.youtubeKey = this.youtubeKey + this.movieVideo.key;
      
      }else{

        this.snackbar.createSnackbar("error","Movie Video didn't access")
      }

    });

    //get movie by id
    this.movie.getMovieById(id).subscribe(value => {
     
     if(value.result){

      this.getMovie = value.data;
      this.genres = value.data.genres;

     }else {
      this.snackbar.createSnackbar("error","Movie didn't get");
     }

      this.showSpinner = false;

    });

    this.getRatedMovie();

  }



  returnStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(i:number){
    this.rating = i + 1;
    console.log("onClick: i değeri : " , (i + 1));
    //update database for rate
    this.sendVoteMovie(this.rating);
  }

  //update rating
  sendVoteMovie(rating:number) {
    this.showWoteSpinner = true;

    this.movie.putVotedMovie(rating,this.movieId,this.sessionId).subscribe(data => {

      if(data.result){
        //get from database;
        this.getRatedMovie();

      }else{
        this.userVote = "-";
        this.showWoteSpinner = false;
      }

    });

    this.showSpinner = false;
  }

  getRatedMovie() {
      //get to rated movie
      this.movie.getUserVote(this.movieId, this.sessionId).subscribe(value => {
        
      var rateValue = JSON.parse(value.data);

      if(value.result){

        this.userVote = rateValue.rated.value;
        //sign star
        this.rating = rateValue.rated.value;
      }else {
          
        this.userVote = "-";
      }
    });
  }
  

}
