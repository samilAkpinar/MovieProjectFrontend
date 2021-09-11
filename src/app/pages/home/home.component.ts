import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Welcome to the FilmWorld !!';

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.navigate(['/home/upcoming']);

     if (localStorage.getItem('session') == null) {
       this.route.navigate(['/']);
     }
  }
}
