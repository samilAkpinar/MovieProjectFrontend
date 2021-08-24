import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { MovieService } from 'src/app/services/movie.service';

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
    private voteValue: MovieService
    ) { }

  ngOnInit(): void {
    this.labelState = false;
  }

  onFocus():void {
    this.labelState = true;
  }

  onBlur():any {

    this.labelState = false;
    console.log(this.value);

    if(this.type == "email"){
      
      this.formService.addEmail(this.value);

    }else if(this.type == "password"){

      this.formService.addPassword(this.value);

    }else if(this.type == "votedMovie"){

      if ( +this.value > 0 && +this.value < 11){
        this.voteValue.addVoteValue(+this.value);
      
      }else{
        console.log("girilen değer 1 ile 10 arasında olmalı");
      }
      

    }else{

      this.formService.addEmail('');
      this.formService.addPassword('');
    }

  }

}
