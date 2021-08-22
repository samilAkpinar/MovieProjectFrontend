import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  constructor(private http: HttpClient) { }

  menuList!:any;

  getMenuList(token:string):Observable<any> {
    //token değeri ile Authorization işlemi yapılmış oldu.
   return this.http.get("https://localhost:44389/api/v1/home/get-menu?token="+token, {headers: new HttpHeaders().set('Authorization', 'Bearer '+token)});
    
    
  }
  
}
