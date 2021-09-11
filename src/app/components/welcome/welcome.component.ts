import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  showSpinner: boolean = false;
  UpcomingMovieList:any[] = [];

  constructor(
    private movies: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;

    this.movies.getUpcomingMovies(3).subscribe(value =>{

      //console.log("upcoming ", value.data);

      this.UpcomingMovieList = value.data;
      this.showSpinner = false;
    });
    
  }

  movieDetail(movieId:number) {
    
    //console.log("movie id ", movieId);
    this.router.navigate(['movies/' + movieId ]);
  }


  Search(movieTitle:string){
    if(movieTitle != ""){

      this.UpcomingMovieList = this.UpcomingMovieList.filter(res => {
        return res.title.toLocaleLowerCase().match(movieTitle.toLocaleLowerCase());
      });

    }else if (movieTitle == ""){
      this.ngOnInit();
    }

    
  }

}
