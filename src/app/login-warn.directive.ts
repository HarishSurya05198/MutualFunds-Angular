import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoginWarn]'
})
export class LoginWarnDirective {

  @Input('appLoginWarn')
  loggedIn!: Boolean;

  constructor(private el: ElementRef,private render:Renderer2) { }

  ngOnInit(){
    console.log("check : ",this.loggedIn);
    if(this.loggedIn == false){
      this.el.nativeElement.style.display = 'none';
    }
    else{
      this.el.nativeElement.style.color = "red";
      //this.el.nativeElement.style.display = "flex";
    }
  }

}
