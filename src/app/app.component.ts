import { Component } from '@angular/core';
import { MutualFundServiceService } from './mutual-fund-service.service';
import { AuthGuard } from './guard/auth.guard';
import ta from '../../public/i18n/ta.json';
import en from '../../public/i18n/en.json';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MutualFundsApp';
  user:any = 'null';
  disable:Boolean = true;
  selected:any = 'en';
  constructor(private service:MutualFundServiceService,private guard: AuthGuard,private translate: TranslateService){
    this.translate.setTranslation('en',en);
    this.translate.setTranslation('ta',ta);
    this.translate.setDefaultLang(this.selected);
  }

  ngOnInit(){
    let temp = localStorage.getItem("user");
    if(temp){
      this.user = JSON.parse(temp);
      this.disable = false;
    }
    else{
      this.disable = true;
    }
    this.service.getRefresh().subscribe(userVal =>{
      if(this.user == "null"){
        this.user = userVal;
      }
    })
  }

  langChange(e:any){
    this.translate.use(e);
  }
  
  logout(){
    this.guard.logout();
  }
}
