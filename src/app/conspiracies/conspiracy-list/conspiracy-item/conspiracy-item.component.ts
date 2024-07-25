import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conspiracy } from '../../conspiracy.model';

@Component({
  selector: 'app-conspiracy-item',
  templateUrl: './conspiracy-item.component.html',
  styleUrls: ['./conspiracy-item.component.css']
})
export class ConspiracyItemComponent {
  @Output() conspiracySelected = new EventEmitter<void>();
  @Input() conspiracy!: Conspiracy;
  
  onSelected() {
    this.conspiracySelected.emit();
  }
}
