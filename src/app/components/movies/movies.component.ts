import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(
    private movies: MovieService,
    private router: Router
    ) { }

  movieList:any;

  ngOnInit(): void {
    //servise gidip backend alanına filmleri getirecek.

    this.movies.getAllMovieList().subscribe(value =>{
      console.log("film değeri: ", value.data);
      this.movieList = value.data
    })
  }

  movieDetail(movieId:number) {
    
    console.log("movie id ", movieId);
    this.router.navigate(['movies/' + movieId ]);
  }

}
