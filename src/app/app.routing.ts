import { Routes, RouterModule } from '@angular/router';
import { AppURL } from './app.url';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UnauthenticationGuard } from './guards/unauthentication.guard';

const RouteLists: Routes = [
    { path: '', redirectTo: AppURL.Login, pathMatch: 'full' },
    { path: AppURL.Login, component: LoginComponent, canActivate: [UnauthenticationGuard] },
    { path: AppURL.Forgot,component: ForgotComponent, canActivate: [UnauthenticationGuard] },
    {
        path: AppURL.Authen,
        loadChildren: './authentication/authentication.module#AuthenticationModule',
        canActivate: [AuthenticationGuard]
    }
];

export const AppRouting = RouterModule.forRoot(RouteLists);