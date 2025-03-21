import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutualFundServiceService } from '../mutual-fund-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuard } from '../guard/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userLogin!: FormGroup;
  val = 'login';
  loaderEnable:boolean = false;
  errorLogin:boolean = false;
  loggedIn:boolean = false;
  details:any;
  loadSpinner:boolean = false;
  constructor(
    private _formbuilder: FormBuilder,
    private router:Router,
    private auth: AuthGuard,
    private service:MutualFundServiceService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userLogin = this._formbuilder.group({
      email: ['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      password: ['',[Validators.required]],
    })
  }

  onSubmit(){
    this.loadSpinner = true;
    this.errorLogin = false;
    this.loaderEnable = true;
    let obj = this.userLogin.value;
    this.service.loginUser(this.val,obj).subscribe((resp:any)=>{
      if(resp.data){
        this.details = resp;
        this.loadSpinner = true;
        this.sendOtp();  
      }
      else{
        this.errorLogin = true;
        this.loaderEnable = false;
        this.loggedIn = false;
        this.loadSpinner = false;
      }
    },
    (error:any)=>{
      this.errorLogin = true;
      this.loaderEnable = false;
      this.loggedIn = false;
      this.loadSpinner = false;
    })
  }

  sendOtp(){
    let param = {
      email: this.details.data.email
    }
    this.service.emailOtp('send-otp',param).subscribe((resp:any)=>{
      if(resp.message == "OTP Sent Successfully"){
        this.loggedIn = true;
        this.loadSpinner = false;
      }
      else{
        this.loggedIn = false;
        this.loadSpinner = false;
      }
    })
  }

  closeButton(e:any){
    if(e){
      this.loggedIn = false;
      this.service.sendRefresh(this.details.data);
      localStorage.setItem("user",JSON.stringify(this.details.data));
      localStorage.setItem("token",this.details.token);
      this.auth.handleSessionTimeout();
      this.openSnackBar();
    }
    else{
      this.loggedIn = true;
    }
  }

  openSnackBar() {
    this.snackBar.open('Login Success !','', {
      duration: 3000,
    });
    this.router.navigate(['/home']);
  }
}

