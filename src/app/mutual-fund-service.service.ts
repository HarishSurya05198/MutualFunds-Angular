import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../public/environment';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class MutualFundServiceService {

  private reloadLogin = new Subject<any>();
  loginDetail:any;

  constructor(private httpService:HttpClient) { }

  registerUser(val: string, obj:any){
    return this.httpService.post(environment.baseUrl+environment.baseUserSlot +val,obj);
  }

  updateUser(val:string, obj:any){
    return this.httpService.put(environment.baseUrl+environment.baseUserSlot + val,obj);
  }

  loginUser(val: string, obj:any){
    return this.httpService.post(environment.baseUrl+environment.baseUserSlot +val,obj);
  }

  getAllCategories(val:string){
    return this.httpService.get(environment.baseUrl+environment.baseTypeSlot+val);
  }

  getSubCatDetails(val:string){
    return this.httpService.get(environment.baseUrl+environment.baseTypeSlot+val);
  }

  investAmount(val: string, obj:any){
    return this.httpService.post(environment.baseUrl+environment.baseInvestSlot +val,obj);
  }
  
  emailOtp(val:string, obj:any){
    return this.httpService.post(environment.baseUrl + environment.baseOtpSlot + val , obj);
  }

  searchByKeyword(val:string){
    return this.httpService.get(environment.baseUrl+environment.baseInvestSlot +val);
  }

  sendRefresh(message:any){
    this.loginDetail = message;
    this.reloadLogin.next(message);
  }
  getRefresh(){
    return this.reloadLogin.asObservable();
  }
}
