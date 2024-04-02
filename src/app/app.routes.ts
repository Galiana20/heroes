import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: 'create', component: CreatePageComponent },
    { path: '**', redirectTo: 'home' }
];
