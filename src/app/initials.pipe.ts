import { Pipe,PipeTransform } from "@angular/core";

@Pipe({name:'initials'})

export class initialsPipe implements PipeTransform{
    
    transform(value: String) {
        let names = value.split(' ');
        let initials = names[0].substring(0,1).toUpperCase();

        if(names.length > 1){
            initials += names[names.length -1].substring(0,1).toUpperCase();
        }

        return initials;
    }
    
}