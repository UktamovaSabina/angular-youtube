import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent
    },
    {
        path: "register", component: RegistrationComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "card", component: CardsComponent
    },
    { path: '**', redirectTo: 'login' }
];
