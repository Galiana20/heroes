import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/heroes.service';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideAnimations(),
  importProvidersFrom([
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ]), provideAnimationsAsync()]
};
