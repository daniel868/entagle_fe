import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.reducer";
import {AutoLoginAction, LogoutAction} from "../../state/auth/auth.actions";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-temp-main',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './temp-main.component.html',
  styleUrl: './temp-main.component.css'
})
export class TempMainComponent implements OnInit {
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
