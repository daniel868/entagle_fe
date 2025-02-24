import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {AppState} from "./state/app.reducer";
import {Store} from "@ngrx/store";
import {AutoLoginAction, LogoutAction} from "./state/auth/auth.actions";
import {NgIf} from "@angular/common";
import {HeroSectionsComponent} from "./main/landing/hero-sections/hero-sections.component";
import {MissionSectionComponent} from "./main/landing/mission-section/mission-section.component";
import {ServiceSectionComponent} from "./main/landing/services/service-section/service-section.component";
import {
  TestimonialSectionComponent
} from "./main/landing/testimonial/testimonial-section/testimonial-section.component";
import {SpecializationComponent} from "./main/landing/specialization/specialization.component";
import {ContactUsComponent} from "./main/landing/contact-us/contact-us.component";
import {HeaderComponent} from "./main/header/header.component";
import {LandingComponent} from "./main/landing/landing/landing.component";

function BsDropdownModule() {

}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive, NgIf, HeroSectionsComponent, MissionSectionComponent, ServiceSectionComponent, TestimonialSectionComponent, SpecializationComponent, ContactUsComponent, HeaderComponent, LandingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    BsModalRef,
    BsDropdownConfig,
    BsModalService,
  ]
})
export class AppComponent implements OnInit {
  title = 'entangle-fe';
  isAuthenticated: boolean = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth')
      .pipe()
      .subscribe(user => {
        this.isAuthenticated = !!user && user.accountActivate;
      });

    this.store.dispatch(AutoLoginAction());

  }

  logout() {
    this.store.dispatch(LogoutAction())
  }
}
