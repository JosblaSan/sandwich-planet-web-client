import { Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegistroComponent } from './registro/registro.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'order-history', component: OrderHistoryComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
