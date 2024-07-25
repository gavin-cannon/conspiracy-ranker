import { Component, OnDestroy, OnInit } from '@angular/core';
import { Conspiracy } from '../conspiracy.model';
import { Subscription } from 'rxjs';
import { ConspiracyService } from '../conspiracy.service';

@Component({
  selector: 'app-conspiracy-list',
  templateUrl: './conspiracy-list.component.html',
  styleUrls: ['./conspiracy-list.component.css']
})
export class ConspiracyListComponent implements OnInit, OnDestroy{
  conspiracies: Conspiracy[] = [];
  subscription: Subscription = new Subscription();
  term: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  constructor(private conspiracyService: ConspiracyService) { }
  
ngOnInit(): void {
  this.conspiracies = this.conspiracyService.getConspiracies();
  this.subscription = this.conspiracyService.conspiracyChangedEvent.subscribe(
    (conspiracies: Conspiracy[]) => {
      this.conspiracies = conspiracies;
    }
  )
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
  
  search(value: string) {
    this.term = value;
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortConspiracies();
  }


  sortConspiracies() {
    this.conspiracies.sort((a, b) => {
      if (a.rating < b.rating) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (a.rating > b.rating) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

}
