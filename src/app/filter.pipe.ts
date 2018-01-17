import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
    name: 'filter'
})


export class FilterPipe implements PipeTransform {


    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        
        console.log(items)
        const pattern = new RegExp(searchText, 'i')
        return items.filter(it => pattern.test(it.name) || pattern.test(it.address))
    }

}


