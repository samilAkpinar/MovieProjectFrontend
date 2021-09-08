import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route:Router,
  
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem("jwt-token") == null || localStorage.getItem("movie_token") == null ){
      
      this.route.navigate(['/']);

    }
  }

}
