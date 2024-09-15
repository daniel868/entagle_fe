import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../state/app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {

  username: string;

  userSubscription: Subscription;


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .subscribe(response => {
        if (!!response.user) {
          this.username = response.user;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
