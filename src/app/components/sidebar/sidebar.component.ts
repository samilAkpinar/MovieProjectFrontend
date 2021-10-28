import { Component, OnInit } from '@angular/core';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private menu : SidebarMenuService,
    private snackbar : SnackbarService
    ) { }

    menuList:any;
    token:any = localStorage.getItem("jwt-token");
    showSpinner: Boolean = false;
    

  ngOnInit(): void {
    
    this.showSpinner = true;

    this.menu.getMenuList(this.token).subscribe(values => {
      //console.log("get menu değeri: " , values)
      
      if(values.result) {
        this.menuList = values.data; 
        this.showSpinner = false;
        
      }else{

        this.snackbar.createSnackbar("error","menu listesi getirilemedi");
      }

    });    
  }
}
