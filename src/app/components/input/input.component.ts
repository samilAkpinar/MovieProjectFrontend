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

    /*

    if(this.type == "email"){
      
      this.formService.addEmail(this.value);

    }else if(this.type == "password"){

      this.formService.addPassword(this.value);

    }else if(this.type == "votedMovie"){

      if ( +this.value > 0 && +this.value < 11){
        this.snackbarService.createSnackbar("success","Your vote successfully update")
        this.voteValue.addVoteValue(+this.value);
        
      
      }else{
        this.snackbarService.createSnackbar("error","Error, The entered value must be between 1 and 10")
      }
      

    }else{

      this.formService.addEmail('');
      this.formService.addPassword('');
    }

    */
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
      
    }else if(this.type == "votedMovie" && data != ''){

      this.voteValue.addVoteValue(+data);
      
    }else{

      this.formService.addName("");
      this.formService.addSurname("");
      this.formService.addEmail("");
      this.formService.addPassword("");
    }
  }

  

}
