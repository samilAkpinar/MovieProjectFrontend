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

    getMovie:any;
    genres:any;

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    
    this.movie.getMovieById(id).subscribe(value => {
      //console.log("get movie by id: ", value.data);

      this.getMovie = value.data;

      this.genres = value.data.genres;
    })


    //get-vote- işlemi ile kullanıcının verdiği puan buradan alınır.
    //bunun için film token session değerleri alınması gereklidir.
  }


  //inputa girilen değeri backente kayıt eder.
  sendVoteMovie() {

  }

}
