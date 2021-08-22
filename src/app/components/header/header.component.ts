import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  email:any;

  ngOnInit(): void {
  }

  logout():void{
    localStorage.removeItem("jwt-token");
    this.route.navigate(['/']);
  }

}
