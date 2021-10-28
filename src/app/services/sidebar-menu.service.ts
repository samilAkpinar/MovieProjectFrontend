import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
    ) { }

  menuList!:any;

  getMenuList(token:string):Observable<any> {
    //token değeri ile Authorization işlemi yapılmış oldu.
   return this.http.get(this.apiUrl +"/home/get-menu?token="+token, {headers: new HttpHeaders().set('Authorization', 'Bearer '+token)});
    
    
  }
  
}
