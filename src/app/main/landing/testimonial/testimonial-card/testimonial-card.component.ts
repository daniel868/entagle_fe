import {Component, Input} from '@angular/core';
import {Testimonial} from "../../landing-model";

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {

  @Input() testimonial!: Testimonial;
}
