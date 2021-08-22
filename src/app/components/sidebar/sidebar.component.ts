import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private menu : SidebarMenuService
    ) { }

    menuList:any;
    token:any = localStorage.getItem("jwt-token");
    

  ngOnInit(): void {
    
    //sayfa yenilendiği için link kayboluyor. Bu yüzden localstorage veya cookie ye kayıt et.

    

    this.menu.getMenuList(this.token).subscribe(values => {
      console.log("get menu değeri: " , values.isSuccess)
      
      if(values.isSuccess == false) {
        console.log("menu listesi getirilemedi")
      }

      this.menuList = values.data;       
      
    });
    
  
    
    
  }


}
