import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MutualFundServiceService } from '../../mutual-fund-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrl: './otp-login.component.scss'
})
export class OtpLoginComponent {
  
  @Input() userVal:any;
  @Output() closeVal = new EventEmitter<Boolean>();
  @ViewChild('valInput', { static: false}) ngOtpInput: any;
  otpVal:any;
  disableInvest:boolean = true;
  resend:boolean = false;
  errorMessage:any;
  loadSpinner:boolean = false;

  constructor(private service: MutualFundServiceService,
    private snackBar:MatSnackBar,private router:Router){}
  
  ngOnInit(){}

  onOtpChange(e:any){
    this.otpVal = e;
    if(this.otpVal){
      if(this.otpVal.length <= 3){
        this.disableInvest = true;
      }
      else{
        this.disableInvest = false;
      }
    } 
  }

  closeButton(e:any){
    this.ngOtpInput.setValue('');
    this.closeVal.emit(e);
  }

  verifyOtp(){
    this.loadSpinner = true;
    let param = {
      email: this.userVal.email,
      otp: this.otpVal
    }
    this.service.emailOtp('verify-email',param).subscribe((resp:any)=>{
      if(resp.message == "OTP Verified Successfully"){
        this.loadSpinner = false;
        this.closeButton(true);
        this.openSnackBar(resp.message);
        this.resend = false;
      }
      else{
        this.loadSpinner = false;
        this.resend = true;
        this.errorMessage = resp.message;
      }
    })
  }

  sendOtp(){
    this.loadSpinner = true;
    let param = {
      email: this.userVal.email
    }
    this.service.emailOtp('send-otp',param).subscribe((resp:any)=>{
      if(resp.message == "OTP Sent Successfully"){
        this.ngOtpInput.setValue('');
        this.resend = false;
        this.loadSpinner = false;
      }
      else{
        this.loadSpinner = false;
        this.resend = true;
        this.errorMessage = resp.message;
      }
    })
  }

  openSnackBar(msg:any) {
    this.snackBar.open( msg,'', {
      duration: 3000,
    });
    this.router.navigate(['/home']);
  }

}
