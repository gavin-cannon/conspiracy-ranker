import { Pipe, PipeTransform } from '@angular/core';
import { Conspiracy } from './conspiracy.model';

@Pipe({
  name: 'conspiraciesFilter'
})
export class ConspiracyFilterPipe implements PipeTransform {

 
transform(contacts: Conspiracy[], term: string) { 
  let filteredContacts: Conspiracy[] =[];  
  if (term && term.length > 0) {
     filteredContacts = contacts.filter(
        (contact:Conspiracy) => contact.name.toLowerCase().includes(term.toLowerCase())
     );
  }
  if (filteredContacts.length < 1){
     return contacts;
  }
  return filteredContacts;
}


}