import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MutualFundServiceService } from '../../mutual-fund-service.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheme-book',
  templateUrl: './scheme-book.component.html',
  styleUrl: './scheme-book.component.scss'
})
export class SchemeBookComponent {

  @Input() scheme:any;
  @ViewChild('popup') pop!: TemplateRef<any>;
  totalAmount:any;
  @Output() closeVal = new EventEmitter<Boolean>();
  investDetails:any;
  loggedUser:any;
  loadSpinner:boolean = false;
  disableInvest:boolean = true;
  errorMessage:any = "Please enter valid amount";

  constructor(private dialog:MatDialog, private service: MutualFundServiceService,
     private datePipe:DatePipe, private snackBar:MatSnackBar,private router:Router){}

  ngOnInit(){
    this.checkUser();
  }

  checkUser(){
    let temp = localStorage.getItem("user");
    if(!temp){
      this.disableInvest = true;
      this.errorMessage = "User must be logged in to proceed";
    }
    else{
      if(this.totalAmount){
        this.disableInvest = false;
        this.loggedUser = JSON.parse(temp);
      }
      else{
        this.disableInvest = true;
        this.errorMessage = "Please enter valid amount";
      }
    }
  }

  checkVal(e:any){
    let temp = e.target.value;
    if(!temp){
      this.disableInvest = true;
      this.errorMessage = "Please enter valid amount";
    }
    else{
      if(temp.trim().length == 0){
        this.disableInvest = true;
        this.errorMessage = "Please enter valid amount";
      }
      else{
        this.checkUser();
      }
    }
  }

  closeButton(){
    this.totalAmount = null;
    this.closeVal.emit(false);
  }

  openPopup(){
    this.dialog.open(this.pop,{panelClass: 'my-custom-dialog-class'});

    var date = this.datePipe.transform(new Date() , 'YYYY-MM-dd');
    this.investDetails = {
      sub_cat_id:this.scheme.id,
      user_id:this.loggedUser.id,
      date:date,
      total_amount:this.totalAmount,
    }
  }

  investAmount(){
    this.loadSpinner = true;
    this.service.investAmount('bookInvestment',this.investDetails).subscribe((resp:any)=>{
      this.loadSpinner = false;
      this.openSnackBar(resp.message);
    })
  }

  openSnackBar(msg:any) {
    this.snackBar.open( msg,'', {
      duration: 3000,
    });
    this.router.navigate(['/home']);
  }

}
