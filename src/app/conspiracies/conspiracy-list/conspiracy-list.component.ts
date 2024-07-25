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
  
}
