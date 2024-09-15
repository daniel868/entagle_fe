import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.reducer";
import {map, Observable, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class EmailValidationGuard implements CanActivate {


  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    console.log(JSON.stringify(route.queryParams));
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        let emailToken = route.queryParams['emailToken']
        if (!!emailToken) {
          return true;
        }

        const isAuth = !!authState.user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth'])
      })
    );
  }
}
