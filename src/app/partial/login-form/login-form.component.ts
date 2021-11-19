import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  model = new Login("","");
  constructor() { }


  ngOnInit(): void {
  }

}
