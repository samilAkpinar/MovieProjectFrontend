import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movieList:any[] = [];
  showSpinner: boolean = false;

  constructor(
    private movies: MovieService,
    private router: Router
    ) { }

  

  ngOnInit(): void {
    this.showSpinner = true;

    this.movies.getAllMovieList().subscribe(value =>{
      //console.log("film değeri: ", value.data);
      
      this.movieList = value.data
      this.showSpinner = false;

    });

  }

  movieDetail(movieId:number) {
    
    //console.log("movie id ", movieId);
    this.router.navigate(['movies/' + movieId ]);
  }


  Search(movieTitle:string){
    if(movieTitle != ""){

      this.movieList = this.movieList.filter(res => {
        return res.title.toLocaleLowerCase().match(movieTitle.toLocaleLowerCase());
      });

    }else if (movieTitle == ""){
      this.ngOnInit();
    }

    
  }

}
