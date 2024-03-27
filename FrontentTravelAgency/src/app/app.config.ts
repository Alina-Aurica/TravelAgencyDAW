import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";

export function windowFactory(){
  return window;
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideHttpClient(), {provide: 'Window', useFactory: windowFactory}]
};
