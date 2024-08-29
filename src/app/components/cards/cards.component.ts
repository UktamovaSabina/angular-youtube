import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() data: any;

  details: boolean = true;

  showModal() {
    this.details = false;
  }
  closeModal() {
    this.details = true;
  }
}
