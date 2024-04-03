import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/heroes.service';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  importProvidersFrom([
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ])]
};
