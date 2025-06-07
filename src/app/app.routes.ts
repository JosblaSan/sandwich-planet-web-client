import { Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SandwichListComponent } from './sandwich-list/sandwich-list.component';
import { MantenedorComponent } from './mantenedor/mantenedor.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent },
    { path: '', component: SandwichListComponent },
    { path: 'create', component: MantenedorComponent },
    { path: 'edit/:id', component: MantenedorComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
