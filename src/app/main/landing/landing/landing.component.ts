import { Component } from '@angular/core';
import {ContactUsComponent} from "../contact-us/contact-us.component";
import {HeroSectionsComponent} from "../hero-sections/hero-sections.component";
import {MissionSectionComponent} from "../mission-section/mission-section.component";
import {ServiceSectionComponent} from "../services/service-section/service-section.component";
import {SpecializationComponent} from "../specialization/specialization.component";
import {TestimonialSectionComponent} from "../testimonial/testimonial-section/testimonial-section.component";
import {HeaderComponent} from "../../header/header.component";
import {MedicalNoteComponent} from "../../notes/medical-note/medical-note.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ContactUsComponent,
    HeroSectionsComponent,
    MissionSectionComponent,
    ServiceSectionComponent,
    SpecializationComponent,
    TestimonialSectionComponent,
    HeaderComponent,
    MedicalNoteComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
