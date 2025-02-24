import {Component} from '@angular/core';
import {Testimonial} from "../../landing-model";
import {TestimonialCardComponent} from "../testimonial-card/testimonial-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [
    TestimonialCardComponent,
    NgForOf
  ],
  templateUrl: './testimonial-section.component.html',
  styleUrl: './testimonial-section.component.css'
})
export class TestimonialSectionComponent {
  testimonials: Testimonial[] = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/85358858d129f818f8f695129370b3c6f58fcbfb971d6e2e064071356c604c33?placeholderIfAbsent=true",
      content:
        "Boost your product and service's\ncredibility by adding testimonials\nfrom your clients. People love\nrecommendations so feedback from\nothers who've tried it is invaluable.",
      author: "X, 57",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/344ad8358514fe2ebe600d691a1731ab79ca06e0bdb7da204a9edeee1718ba93?placeholderIfAbsent=true",
      content:
        "Boost your product and service's\ncredibility by adding testimonials\nfrom your clients. People love\nrecommendations so feedback from\nothers who've tried it is invaluable.",
      author: "Y, 34",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/0b37981e5c3840ba983029b159f4d193/fb62088275056bb5ffe89dd4bab029083338703e592da84ad457488bf9c78ee3?placeholderIfAbsent=true",
      content:
        "Boost your product and service's\ncredibility by adding testimonials\nfrom your clients. People love\nrecommendations so feedback from\nothers who've tried it is invaluable.",
      author: "Z, 14",
    },
  ];
}
