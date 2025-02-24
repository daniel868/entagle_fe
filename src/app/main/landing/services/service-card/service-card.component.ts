import {Component, Input} from '@angular/core';
import {ServiceCard} from "../../landing-model";

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {

  @Input() service!: ServiceCard;
}
