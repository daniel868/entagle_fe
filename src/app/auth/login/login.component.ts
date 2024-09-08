import {Component, EventEmitter, Output} from '@angular/core';
import {AppState} from "../../state/app.reducer";
import {Store} from "@ngrx/store";
import {FormsModule} from "@angular/forms";
import {LoginStartAction} from "../../state/auth/auth.actions";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output()
  registerClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  username: string;
  password: string;

  constructor(private store: Store<AppState>) {
  }

  onRegisterClicked() {
    this.registerClicked.emit(true);
  }

  onLoginClicked() {
    console.log("LoginStartAction dispatched")
    this.store.dispatch(LoginStartAction({username: this.username, password: this.password}))
  }

  onUsernameChanged(newValue: string) {
    this.username = newValue;
  }

  onPasswordChanged(newValue: string) {
    this.password = newValue;
  }
}
