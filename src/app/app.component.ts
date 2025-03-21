import { Component } from '@angular/core';
import { MutualFundServiceService } from './mutual-fund-service.service';
import { AuthGuard } from './guard/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MutualFundsApp';
  user:any = 'null';

  constructor(private service:MutualFundServiceService,private guard: AuthGuard){}

  ngOnInit(){
    let temp = localStorage.getItem("user");
    if(temp){
      this.user = JSON.parse(temp);
    }
    this.service.getRefresh().subscribe(userVal =>{
      if(this.user == "null"){
        this.user = userVal;
      }
    })
  }
  
  logout(){
    this.guard.logout();
  }
}
