import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {AuthEffects} from "./state/auth/auth.effects";
import {provideHttpClient} from "@angular/common/http";
import {authReducer} from "./state/auth/auth.reducer";
import {appReducer} from "./state/app.reducer";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects([AuthEffects]),
  ],
};
