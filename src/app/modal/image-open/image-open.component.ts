import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-open',
  standalone: true,
  imports: [],
  templateUrl: './image-open.component.html',
  styleUrl: './image-open.component.scss'
})
export class ImageOpenComponent {
  @Input() imageSrc!: string;

  constructor(public activeModal: NgbActiveModal) { }
}
