import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MutualFundServiceService } from '../mutual-fund-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userRegister!: FormGroup;
  val:string = 'register';
  loadSpinner:boolean = false;
  constructor(
    private _formbuilder: FormBuilder,
    private router:Router,
    private service:MutualFundServiceService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userRegister = this._formbuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      phone: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      confirmPassword: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }

  onSubmit(){
    let obj = this.userRegister.value;
    this.service.registerUser(this.val,obj).subscribe((resp:any)=>{
      this.loadSpinner = false;
      this.openSnackBar();
    })
  }

  verifyPassword(){
    this.loadSpinner = true;
    if(this.userRegister.controls['confirmPassword'].value == this.userRegister.controls['password'].value){
      this.onSubmit();
    }
    else{
      this.loadSpinner = false;
      this.openSnackBarPassword();
    }
  }

  openSnackBarPassword() {
    this.snackBar.open('Passwords not matching','', {
      duration: 3000,
    });
  }

  openSnackBar() {
    this.snackBar.open('Registeration Successfull !','', {
      duration: 3000,
    });
    this.router.navigate(['/login']);
  }

}
