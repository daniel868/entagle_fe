import {Injectable} from '@angular/core';
import {AppState} from "../state/app.reducer";
import {Store} from "@ngrx/store";
import {LogoutAction} from "../state/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(duration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(LogoutAction())
    }, duration)
  }

  clearTimeout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
      this.tokenExpirationTimer = null;
    }
  }

}
