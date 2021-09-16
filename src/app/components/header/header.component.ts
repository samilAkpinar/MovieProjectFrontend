import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private route:Router,
    private snackbarService: SnackbarService,
    private menu : SidebarMenuService
    ) { }

  email:any;
  user:any;

  menuList:any;
  token:any = localStorage.getItem("jwt-token");
  showSpinner: Boolean = false;

  

  ngOnInit(): void {
    this.user = {
      fullName: localStorage.getItem("name-surname"),
      email: localStorage.getItem("email")
    }

    this.showSpinner = true;

    this.menu.getMenuList(this.token).subscribe(values => {
      //console.log("get menu değeri: " , values.isSuccess)
      
      if(values.isSuccess == false) {
        //console.log("menu listesi getirilemedi")
        this.snackbarService.createSnackbar("error","Get list failed");
      }

      this.menuList = values.data; 
      this.showSpinner = false;

    });
  }

  
  logout():void{
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("movie_token");
    localStorage.removeItem("session");

    this.snackbarService.createSnackbar("success","Successful Logout");

    this.route.navigate(['/']);

  }

  openMenu(){
    console.log("open menu");
  }

}
