import { Component } from '@angular/core';
import { MutualFundServiceService } from '../mutual-fund-service.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  viewProviders: [MatExpansionPanel]
})
export class HomeComponent {

  categories:any;
  loadSpinner:boolean = false;
  constructor(private service:MutualFundServiceService,private router:Router){}

  ngOnInit(){
    this.loadSpinner = true;
    this.loadCategories();
  }

  loadCategories(){
    this.service.getAllCategories('getCategotries').subscribe((resp:any) =>{
      if(resp){
        this.loadSpinner = false;
        this.categories = resp.data;
      }
    })
  }

  redirect(id:any){
    this.router.navigate(['details/'+id])
  }

}
