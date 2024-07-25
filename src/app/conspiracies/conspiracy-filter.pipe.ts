import { Pipe, PipeTransform } from '@angular/core';
import { Conspiracy } from './conspiracy.model';

@Pipe({
  name: 'conspiraciesFilter'
})
export class ConspiracyFilterPipe implements PipeTransform {

 
transform(conspiracies: Conspiracy[], term: string) { 
  let filteredConspiracies: Conspiracy[] =[];  
  if (term && term.length > 0) {
     filteredConspiracies = conspiracies.filter(
        (conspiracy:Conspiracy) => conspiracy.name.toLowerCase().includes(term.toLowerCase())
     );
  }
  if (filteredConspiracies.length < 1){
     return conspiracies;
  }
  return filteredConspiracies;
}


}