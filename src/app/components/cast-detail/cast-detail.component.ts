import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastService } from 'src/app/services/cast.service';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.component.html',
  styleUrls: ['./cast-detail.component.scss']
})
export class CastDetailComponent implements OnInit {

  showSpinner: boolean = false;
  cast:any = [];
  gender!:string;
  

  constructor(
    private route: ActivatedRoute,
    private castService: CastService
    ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    
    this.showSpinner = true;

    //Burada cast servisine gidilecek ve cast by id çağrılacak.
    this.castService.getCastById(id).subscribe(value =>{

      //console.log("cast dönen veri: ",value.data);
      this.cast = value.data;

      if(this.cast.gender == 1){

        this.gender = "Female"

      }else if(this.cast.gender == 2){

        this.gender = "Male"

      }else{

        this.gender = ""
      }

      this.showSpinner = false;

    });

    
  }

}
