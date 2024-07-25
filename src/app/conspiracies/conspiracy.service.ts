import { EventEmitter, Injectable } from '@angular/core';
import { Conspiracy } from './conspiracy.model';
// import { MOCKconspiracies } from './MOCKconspiracies';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConspiracyService {
  conspiracies: Conspiracy[] = [];
  conspiracyChangedEvent = new Subject<Conspiracy[]>();
  conspiracySelectedEvent = new EventEmitter<Conspiracy>();


  constructor(private http: HttpClient) {
    this.getConspiracies();
   }

  getConspiracies() {
    this.http.get<Conspiracy[]>('http://localhost:3000/conspiracies')
      .subscribe(
        (conspiracies: Conspiracy[]) => {

          const conspiracyValues = Object.values(conspiracies)[1];
          console.log('inside subscribe');

          this.conspiracies = conspiracies;
          // this.maxConspiracyId = this.getMaxId();
          this.conspiracies.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          this.conspiracyChangedEvent.next(this.conspiracies.slice());

        }
    );
    console.log(this.conspiracies);
    return this.conspiracies.slice();
  }


  getConspiracy(id: string): Conspiracy {

    if (this.conspiracies === undefined || this.conspiracies.length == 0) {
      this.getConspiracies();
    }

    for (let conspiracy of this.conspiracies) {

      if (conspiracy.id === id) {
        console.log(conspiracy, 'and the id is', conspiracy.id);
        return conspiracy;
      }
    }
    return null;
  }


  deleteConspiracy(conspiracy: Conspiracy) {
    if (!conspiracy) {
      return;
    }
    const pos = this.conspiracies.indexOf(conspiracy);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/conspiracies/' + conspiracy.id)
      .subscribe(
        (response: Response) => {
          this.conspiracies.splice(pos, 1);
          this.conspiracyChangedEvent.next(this.conspiracies.slice());
        }
      );
  }

  addConspiracy(newConspiracy: Conspiracy) {
    if (!newConspiracy) {
        return;
    }

    newConspiracy.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post< Conspiracy >('http://localhost:3000/conspiracies',
      newConspiracy,
      { headers: headers }
    ).subscribe(
      (responseData) => {
        this.conspiracies.push(responseData);
        this.conspiracyChangedEvent.next(this.conspiracies.slice());
      }
    );

    // this.maxContactId++;
    // newContact.id = this.maxContactId.toString();
    // this.contacts.push(newContact);

    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
    // this.storeContacts();
  }

  updateConspiracy(originalConspiracy: Conspiracy, newConspiracy: Conspiracy) {
    if (!originalConspiracy || !newConspiracy) {
        return;  
    }

    const pos = this.conspiracies.indexOf(originalConspiracy); 
    if (pos < 0) {
        return; 
    }

    newConspiracy.id = originalConspiracy.id;  
    this.conspiracies[pos] = newConspiracy;  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.put('http://localhost:3000/conspiracies/' + originalConspiracy.id, newConspiracy, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.conspiracies[pos] = newConspiracy;
          this.conspiracyChangedEvent.next(this.conspiracies.slice());
        }
      );
    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
    // this.storeContacts();
  }


}
