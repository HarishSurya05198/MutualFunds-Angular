import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MutualFundServiceService } from '../mutual-fund-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Buffer } from "buffer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  editEnabled:boolean = false;
  userRegister!: FormGroup;
  val:string = 'update';
  loggedUser:any;
  loadSpinner:boolean = false;
  passwordHide:boolean = false;
  passwordField:String = '';

  constructor(
      private _formbuilder: FormBuilder,
      private router:Router,
      private service:MutualFundServiceService,
      private snackBar:MatSnackBar) { }

  ngOnInit(){
    let temp = localStorage.getItem("user");
    if(temp){
      this.loggedUser = JSON.parse(temp);
      this.loggedUser.password = window.atob(this.loggedUser.password);
    }
    
    this.userRegister = this._formbuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      phone: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      password: ['',[Validators.required]],
    })

    this.setUserValues(this.loggedUser);
    this.passworToggle();
  }

  setUserValues(user:any){
    this.userRegister.controls['name'].setValue(user.name);
    this.userRegister.controls['email'].setValue(user.email);
    this.userRegister.controls['phone'].setValue(user.phone_number);
    this.userRegister.controls['password'].setValue(user.password);
  }

  onSubmit(){
    this.loadSpinner = true;
    let obj = {
        "id": this.loggedUser.id,
        "name": this.userRegister.controls['name'].value,
        "password": this.userRegister.controls['password'].value,
        "email": this.userRegister.controls['email'].value,
        "phone": this.userRegister.controls['phone'].value
    }
    this.service.updateUser(this.val,obj).subscribe((resp:any)=>{
      let msg = resp.message;
      this.loggedUser = resp.data;
      this.loadSpinner = false;
      if(resp.message == "user updated successfully!"){
        this.service.sendRefresh(this.loggedUser);
        localStorage.setItem("user",JSON.stringify(this.loggedUser));
        this.loggedUser.password = window.atob(this.loggedUser.password);
        this.editEnable(false);
      }
      this.openSnackBar(msg);
    })
  }

    passworToggle(){
    this.passwordHide = !this.passwordHide;
    if(this.passwordHide){
      let pass = '';
      for(let item of this.loggedUser.password){
        pass = pass + "*";
      }
      this.passwordField = pass;
    }
    else{
      this.passwordField = this.loggedUser.password;
    }
  }

  editEnable(e:any){
    this.editEnabled = e;
  }

  openSnackBar(msg:any) {
    this.snackBar.open(msg,'', {
      duration: 3000,
    });
  }

}
