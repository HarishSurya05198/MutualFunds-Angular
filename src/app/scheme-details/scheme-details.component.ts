import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MutualFundServiceService } from '../mutual-fund-service.service';

@Component({
  selector: 'app-scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrl: './scheme-details.component.scss'
})
export class SchemeDetailsComponent {

  booking:boolean = false;
  subCatId:any;
  details:any;
  loadSpinner:boolean = false;
  constructor(private route:ActivatedRoute , private service:MutualFundServiceService){}

  ngOnInit(){
    this.loadSpinner = true;
    this.route.paramMap.subscribe(params => {
      this.subCatId = params.get('sid');
      this.displayDetails();
    });
  }

  displayDetails(){
    this.service.getSubCatDetails('getSubCategoryDetails?subCatId='+this.subCatId).subscribe((resp:any)=>{
      this.details = resp.data;
      this.loadSpinner = false;
    })
  }

  enterAmount(){
    this.booking = true;
  }

  closeButton(e:any){
    this.booking = e;
  }

}
