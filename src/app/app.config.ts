import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {AuthEffects} from "./state/auth/auth.effects";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {appReducer} from "./state/app.reducer";
import {UserInfoEffects} from "./state/userInfo/userInfo.effects";
import {bearerTokenInterceptor} from "./shared/bearer-token.interceptor";
import {SharedEffects} from "./state/shared/shared.effects";
import {BsModalService} from "ngx-bootstrap/modal";
import {MedicalEffects} from "./state/medical/medical.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptors([bearerTokenInterceptor])),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects([AuthEffects, UserInfoEffects, SharedEffects, MedicalEffects]),
    BsModalService
  ],
};
