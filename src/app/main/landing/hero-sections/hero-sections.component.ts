import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero-sections',
  standalone: true,
  imports: [],
  templateUrl: './hero-sections.component.html',
  styleUrl: './hero-sections.component.css'
})
export class HeroSectionsComponent {

  constructor(private router: Router) {
  }

  onBookClick() {
    this.router.navigate(['/book-consult'])
  }

  onLoginClick() {
    this.router.navigate(['/app/auth'])
  }
}
