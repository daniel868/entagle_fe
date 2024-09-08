import {Component} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Mocks} from "../mocks/Mocks";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    ReactiveFormsModule,
    FormsModule,
    RegisterComponent,
    LoginComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  registerForm: boolean = false;

  onRegisterClicked(newValue: boolean) {
    this.registerForm = newValue;
  }
}
