import {Component} from '@angular/core';
import {NavItemComponent} from "./nav-item/nav-item.component";
import {NgForOf} from "@angular/common";
import {NavItem} from "../../shared/generic/nav-item";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavItemComponent,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navigationItems: NavItem[] = [
    {label: "Home", route: "home"},
    {label: "About Us", route: "about"},
    {
      label: "Specializations",
      route: "specializations",
      className: "specializations",
    },
    {label: "Services", route: "services"},
    {label: "Testimonials", route: "testimonials", className: "testimonials"},
    {label: "Contact", route: "contact", className: "contact"},
    {label: "I'm a wellbeing specialist", route: "/app/auth"}
  ]
}
