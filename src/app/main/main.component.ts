import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../state/app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FetchUserInfoAction} from "../state/userInfo/userInfo.actions";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {

  username: string;
  email: string;
  userSubscription: Subscription;


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .subscribe(response => {
        if (!!response.user) {
          this.username = response.user;
        }
        if (!!response.email) {
          this.email = response.email;
        }
      });
    this.store.dispatch(FetchUserInfoAction());
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
