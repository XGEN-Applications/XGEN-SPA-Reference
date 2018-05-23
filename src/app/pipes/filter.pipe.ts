import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string): any {    
    if(value)
      return items.filter(item => {
        return item['ProjectTitle'] ? item['ProjectTitle'].toUpperCase().includes(value.toUpperCase()) : false ||
          item['ProjectDescription'] ? item['ProjectDescription'].toUpperCase().includes(value.toUpperCase()) : false
      });
    else 
      return items
  }

}
