import { Component, Input, OnInit } from '@angular/core';
import { Conspiracy } from '../conspiracy.model';
import { ConspiracyService } from '../conspiracy.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-conspiracy-details',
  templateUrl: './conspiracy-details.component.html',
  styleUrls: ['./conspiracy-details.component.css']
})
export class ConspiracyDetailsComponent implements OnInit{
  @Input() conspiracy!: Conspiracy;
  id: string;
  constructor(private conspiracyService: ConspiracyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  

ngOnInit(): void {
  this.route.params.subscribe(
    (params: Params) => {
      this.id = params['id'];
      this.conspiracy = this.conspiracyService.getConspiracy(this.id);
    }
  );

}
  onDelete() {
    this.conspiracyService.deleteConspiracy(this.conspiracy);
    this.router.navigateByUrl('conspiracies');
  }
  
}
