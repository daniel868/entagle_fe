import { Component } from '@angular/core';
import {ContactInfo} from "../landing-model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactInfo: ContactInfo = {
    hours: [
      "Monday: 8am – 7pm",
      "Tuesday: 8am – 5pm",
      "Wednesday: 8am – 5pm",
      "Thursday: 8am – 7pm",
      "Friday: 8am – 5pm",
    ],
    email: "entangle.wellbeing@gmail.com",
    address: ["Str.", "Bucharest", "030822", "Romania"],
  };
}
