import { Component, OnInit } from '@angular/core';
import { CastService } from 'src/app/services/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {

  constructor(private cast:CastService) { }

  castList:any;

  ngOnInit(): void {
    this.cast.getAllCastList().subscribe(value => {
      this.castList = value.data;

    });
  }

}
