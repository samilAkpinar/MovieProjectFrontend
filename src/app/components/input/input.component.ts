import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { MovieService } from 'src/app/services/movie.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type: string = ""; 
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() class: string = "";
  @Input() name: string = "";
  
  
  labelState!: boolean; //input focus durumundaki style değişimidir.
  value: string = "";//formdan gelen email ve şifre değerleridir.

  constructor(
    private formService: FormService,
    private voteValue: MovieService,
    private snackbarService: SnackbarService
    ) { }

  ngOnInit(): void {
    this.labelState = false;

  }


  onFocus():void {
    this.labelState = true;
  }

  onBlur():any {

    this.labelState = false;
    //console.log(this.value);

  }

  sendData(data:string){
    if(this.type == "email" && data != ''){
      
      //console.log("email girdi", data);
      this.formService.addEmail(data);

    }else if(this.type == "password" && data != ''){

      //console.log("password", data);
      this.formService.addPassword(data);

    }else if(this.type == "name" && data != ''){

      //console.log("isim", data);
      this.formService.addName(data);
      
    }else if(this.type == "surname" && data != ''){

      //console.log("surname", data);
      this.formService.addSurname(data);
      
    }else{

      this.formService.addName("");
      this.formService.addSurname("");
      this.formService.addEmail("");
      this.formService.addPassword("");
    }
  }

  

}
