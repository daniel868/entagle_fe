import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AppState} from "../state/app.reducer";
import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        console.log("state: " + authState)
        return authState.user
      }),
      map(user => {
        const isAuth = !!user;
        console.log("auth state: " + user);
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth'])
      })
    );
  }
}

