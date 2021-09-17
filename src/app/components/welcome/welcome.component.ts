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
  listTemp:any[] = [];

  items:any = [];
  pageOfItems!: Array<any>;

  //ngx-pagination
  totalLength!:number
  page:number = 1
  pageValue:number = 1

  constructor(
    private movies: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.showSpinner = true;

    this.movies.getUpcomingMovies(1).subscribe(value =>{

      //console.log("upcoming ", value.data);

      this.UpcomingMovieList = value.data;
      this.listTemp = this.UpcomingMovieList;
      this.totalLength = 380

      this.showSpinner = false;
    });
    
  }

  

  pageChanged(pages:any){
    
    //console.log("page: ", page);
    this.pageValue = pages;
    this.showSpinner = true;

    this.movies.getUpcomingMovies(pages).subscribe(value => {
      
      this.UpcomingMovieList = value.data;
      this.listTemp = this.UpcomingMovieList;

      this.showSpinner = false;
    });

  }

  movieDetail(movieId:number) {
    
    //console.log("movie id ", movieId);
    this.router.navigate(['movies/' + movieId ]);
  }


  Search(movieTitle:string){
    if(movieTitle != ""){

      var list = this.listTemp.filter(res => {
        return res.title.toLocaleLowerCase().match(movieTitle.toLocaleLowerCase());
      });

      this.UpcomingMovieList = list;

    }else if (movieTitle == ""){
      this.pageChanged(this.pageValue);
    }

    
  }

}
