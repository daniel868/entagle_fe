import {HttpHeaders, HttpInterceptorFn, HttpParams} from '@angular/common/http';
import {exhaustMap, take} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.reducer";
import {inject} from "@angular/core";

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>); // Use the inject() function to get services

  return store.select('auth').pipe(
    take(1),
    exhaustMap(authState => {
      console.log("Intercept request");
      if (!!authState.user && authState.accountActivate && !!authState.token) {
        console.log("Intercept request and add bearer token");

        let newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        return next(newRequest);
      }
      return next(req);
    })
  );
};
