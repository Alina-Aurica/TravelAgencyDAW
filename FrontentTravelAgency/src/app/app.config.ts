import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarUtils,
  DateAdapter
} from "angular-calendar";

export function windowFactory(){
  return window;
}

export function provideDateAdapter() {
  return adapterFactory();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: 'Window', useFactory: windowFactory},
    {provide: DateAdapter, useFactory: provideDateAdapter},
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
    CalendarUtils]
};
