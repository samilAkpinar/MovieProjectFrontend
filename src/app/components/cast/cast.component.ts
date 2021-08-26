import { Component, OnInit } from '@angular/core';
import { CastService } from 'src/app/services/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {

  constructor(private cast:CastService) { }

  castList:any[] = [];

  ngOnInit(): void {
    this.cast.getAllCastList().subscribe(value => {
      this.castList = value.data;

    });
  }

  Search(name:string){
    if(name != ""){

      this.castList = this.castList.filter(res => {
        return res.name.toLocaleLowerCase().match(name.toLocaleLowerCase());
      });

    }else if (name == ""){
      this.ngOnInit();
    }
  }

}
