import { Component, OnInit } from '@angular/core';
import { CastService } from 'src/app/services/cast.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {

  castList:any[] = [];
  showSpinner: boolean = false;

  constructor(
    private cast:CastService,
    private snackbar : SnackbarService
    ) { }

  ngOnInit(): void {
    this.showSpinner = true;

    this.cast.getAllCastList().subscribe(value => {
      
      if(value.result){

        this.castList = value.data;
        //console.log("castList",value);
        this.showSpinner = false;

      }else{

        this.snackbar.createSnackbar("error","Cast list didn't get");
      }
       
      
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
