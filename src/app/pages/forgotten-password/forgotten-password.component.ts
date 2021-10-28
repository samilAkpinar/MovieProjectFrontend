import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private navigate: Router,
    private formService: FormService,
    private snackbar : SnackbarService
    ) { }

    email:string="";
    verify!:string;
    emailEncrypted:any;
    
  ngOnInit(): void {

   this.email = this.route.snapshot.params['email'];
   this.verify = this.route.snapshot.params['verify'];

   const md5 = new Md5();
   this.emailEncrypted = md5.appendStr(this.email).end();

   //console.log("email şifreli: ",this.emailEncrypted);
   //console.log("verify şifreli: ",this.verify);

   if(this.emailEncrypted != this.verify){
     this.navigate.navigate(['/404']);
   }

  }

  //button click
  resetPassword():void{
    this.formService.sendNewPassword(this.email).subscribe(value =>{
      
      if(value.result){
        this.snackbar.createSnackbar("info","Password update successfully");
      }else {
        
        this.snackbar.createSnackbar("info","Password update failed");
      }
    })
  }

}
