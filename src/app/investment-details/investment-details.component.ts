import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MutualFundServiceService } from '../mutual-fund-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, fromEvent, map } from 'rxjs';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-investment-details',
  templateUrl: './investment-details.component.html',
  styleUrl: './investment-details.component.scss'
})
export class InvestmentDetailsComponent{

  @ViewChild('inputField') keyword!: ElementRef;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(HomeComponent) home!: HomeComponent;
  loggedUser:any;
  loadSpinner:boolean = false;
  investmentData:any;
  loginDisable:boolean = false;
  displayedColumns:any;
  searchKey:any;
  constructor(private service:MutualFundServiceService, private renderer:Renderer2){}

  ngOnInit(){
    
    this.loadSpinner = true;
    let temp = localStorage.getItem("user");
    if(temp){
      this.loggedUser = JSON.parse(temp);
      if(this.loggedUser.email.includes("yopmail.com")){
        this.fetchInvestments(0);
      }
      else{
        this.fetchInvestments(this.loggedUser.id);
      }
    }
    else{
      this.loginDisable = true;
    } 

  }

  ngAfterViewInit(){
    this.renderer.addClass(this.keyword.nativeElement , "active");
    fromEvent(this.keyword.nativeElement,'keyup').pipe(
      map(e => this.keyword.nativeElement.value),debounceTime(1200)).subscribe( val => {
        this.searchKey = val;
        this.searchFilter(this.searchKey);
        console.log("check home component ",this.home.categories);
      });
  }

  fetchInvestments(id:any){
    let obj = {
      "user_id":id
    }
    this.service.investAmount('getInvestmentList',obj).subscribe((resp:any)=>{
      this.investmentData = new MatTableDataSource(resp.data);
      this.investmentData.paginator = this.paginator;
      this.displayedColumns = Object.keys(resp.data[0]);
      this.loadSpinner = false;
    })
  }

  searchFilter(event: any) {
    this.loadSpinner = true;
    this.service.searchByKeyword('search?keyword='+event).subscribe((resp:any)=>{
      console.log("check response : ",resp);
      this.investmentData = new MatTableDataSource(resp.data);
      this.investmentData.paginator = this.paginator;
      this.displayedColumns = Object.keys(resp.data[0]);
      this.loadSpinner = false;
    },
    (err:any)=>{
      this.investmentData = [];
      this.investmentData.paginator = this.paginator;
      this.loadSpinner = false;
    }
  )
  }

}
