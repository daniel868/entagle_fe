import {Component} from '@angular/core';
import {ServiceCardComponent} from "../service-card/service-card.component";
import {ServiceCard} from "../../landing-model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-service-section',
  standalone: true,
  imports: [
    ServiceCardComponent,
    NgForOf
  ],
  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.css'
})
export class ServiceSectionComponent {
  services: ServiceCard[] = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/eb4e120a45c2f7b83893e7d0a933b17badac27bb0e1427cb42270b4962271e3e?placeholderIfAbsent=true",
      title: "On-line and On-site\nAssesment",
      description:
        "Geographical boundaries shouldn't limit access to healthcare services. From the comfort of your own home, you can connect with our team of experienced well-being professionals.",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/3fbd09ee66fc28bc23647333db9f53bbed6254a4dd4330c8608960284ef7eea5?placeholderIfAbsent=true",
      title: "The Most Efficient\nApproaches",
      description:
        "Through combining wisdom of experts from multiple knowledge streams, we manage to create the most efficient remedies and therapeutic approaches, thus delivering optimal results",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/5d4910aa9fb91640a37587e7dfbbea0476b4069db6521e12f355a540256644c6?placeholderIfAbsent=true",
      title: "Nutritional\nManagement",
      description:
        "Whether you're looking to manage a chronic condition, optimize your athletic performance, or simply feel your best, our online clinic is here to support you every step of the way.",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/72a4e10100416119c6fc6360b586b4d371ea4442c1dfdc1333f09f8ecfc20f84?placeholderIfAbsent=true",
      title: "Free On-Line\nClasses",
      description:
        "By attending one of our webinars, you'll gain a deeper understanding of the interconnectedness of your physical, emotional, and mental wellbeing, and learn how to make lasting changes.",
    },
  ];
}
