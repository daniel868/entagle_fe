import {Component, Input} from '@angular/core';
import {NavItem} from "../../../shared/generic/nav-item";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input() item!: NavItem;
}
