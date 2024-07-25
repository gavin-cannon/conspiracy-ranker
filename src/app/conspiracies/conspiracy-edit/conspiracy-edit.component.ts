import { Component } from '@angular/core';
import { Conspiracy } from '../conspiracy.model';
import { ConspiracyService } from '../conspiracy.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-conspiracy-edit',
  templateUrl: './conspiracy-edit.component.html',
  styleUrls: ['./conspiracy-edit.component.css']
})
export class ConspiracyEditComponent {
  originalConspiracy: Conspiracy;
  conspiracy: Conspiracy;
  groupConspiracies: Conspiracy[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(
       private conspiracyService: ConspiracyService,
       private router: Router,
       private route: ActivatedRoute) {
       }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return
        } 
        this.originalConspiracy = this.conspiracyService.getConspiracy(id);
        if (!this.originalConspiracy) {
          return
        }
        this.editMode = true;
        this.conspiracy = JSON.parse(JSON.stringify(this.originalConspiracy));
        
      }
    )
  }

  onCancel() {
    this.router.navigate(['/conspiracies']);
  }
  onSubmit(form: NgForm) {
    const values = form.controls;
    const name = values['name'].value;
    const rating = values['rating'].value;
    const description = values['description'].value;
    const imageUrl = values['imageUrl'].value;
    const group = [];
    // console.log(name, description, url);
    const newConspiracy = new Conspiracy('', name, rating, description, imageUrl);
    if (this.editMode) {
      this.conspiracyService.updateConspiracy(this.originalConspiracy, newConspiracy);
    } else {
      this.conspiracyService.addConspiracy(newConspiracy);
    }
    this.router.navigate(['/conspiracies']);
  }
}
