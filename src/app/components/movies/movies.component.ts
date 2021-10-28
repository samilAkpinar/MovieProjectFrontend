import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movieList:any[] = [];
  listTemp:any[] = [];
  showSpinner: boolean = false;

  items:any = [];
  pageOfItems!: Array<any>;


  //ngx-pagination
  totalLength!:number
  page:number = 1
  pageValue:number = 1
  
  constructor(
    private movies: MovieService,
    private router: Router,
    private snackbar: SnackbarService
    ) { }

  ngOnInit(): void {
    this.showSpinner = true;

    this.movies.getAllMovieList(1).subscribe(value =>{
      //console.log("film değeri: ", value);
      
      if(value.result){

        this.movieList = value.data
        this.listTemp = this.movieList;
        this.totalLength = 500
      
      }else{

        this.snackbar.createSnackbar("error","movieList didn't get");
      }

      this.showSpinner = false;

    });

  }

  pageChanged(page:any){
    
    //console.log("page: ", page);
    this.pageValue = page;

    this.showSpinner = true;

    this.movies.getAllMovieList(page).subscribe(value => {
      this.movieList = value.data;
      this.listTemp = this.movieList;
      
      this.showSpinner = false;
    });

  }


  movieDetail(movieId:number) {
    
    //console.log("movie id ", movieId);
    this.router.navigate(['movies/' + movieId ]);
  }


  Search(movieTitle:string){  
    
    if(movieTitle.length > 0){
      
        var list =  this.listTemp.filter(res => {
        return res.title.toLocaleLowerCase().match(movieTitle.toLocaleLowerCase());
      });

      this.movieList = list;

    }else if (movieTitle == ""){
      this.pageChanged(this.pageValue);
    }
    
  }

}
