import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, source: string, dest: string, doa: string, priceLimit: number): any {
      let resultsArray: any;
      if(!value) return [];
      if(!source && !dest) return [];
      else 
      resultsArray = value.filter(
        item => {
          if(doa) {
            return item['origin'].includes(source) && 
            item['destination'].includes(dest) && 
            parseInt(item['price'])<=priceLimit && item['date']===doa;
          }
          else return item['origin'].includes(source) && 
          item['destination'].includes(dest) && 
          parseInt(item['price'])<=priceLimit;
  
          });
      return resultsArray;
    }
}
