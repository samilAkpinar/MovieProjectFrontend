import { Component, OnInit } from '@angular/core';
import { CastService } from 'src/app/services/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {

  castList:any[] = [];
  showSpinner: boolean = false;

  constructor(private cast:CastService) { }

  ngOnInit(): void {
    this.showSpinner = true;

    this.cast.getAllCastList().subscribe(value => {

      this.castList = value.data;
      //console.log("castList",value.data);
      this.showSpinner = false;
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
