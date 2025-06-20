import { Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CrearSandwichComponent } from './components/crear-sandwich/crear-sandwich.component';
import { MantenedorComponent } from './components/mantenedor/mantenedor.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'create', component: CrearSandwichComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: MantenedorComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
