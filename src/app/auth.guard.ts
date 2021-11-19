import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from './services/form.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _authService: FormService,
    private _router: Router
    ) { }

    canActivate(): boolean {
      let logged = this._authService.loggedIn();
      if(logged){
        return true;
      }
      this._router.navigate(['']);
      return false;
    }
}
