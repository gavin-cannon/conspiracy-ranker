import { Component, OnInit } from '@angular/core';
import { ConspiracyService } from './conspiracy.service';
import { Conspiracy } from './conspiracy.model';

@Component({
  selector: 'app-conspiracies',
  templateUrl: './conspiracies.component.html',
  styleUrls: ['./conspiracies.component.css']
})
export class ConspiraciesComponent implements OnInit {
  selectedConspiracy: Conspiracy | undefined;

  constructor(private conspiracyService: ConspiracyService) { }
  
  ngOnInit(): void {
    this.conspiracyService.conspiracySelectedEvent.subscribe((conspiracy: Conspiracy) => {
      this.selectedConspiracy = conspiracy;
    })
  }

}
