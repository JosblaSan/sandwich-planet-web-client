import { Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CrearSandwichComponent } from './components/crear-sandwich/crear-sandwich.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AboutComponent } from './components/about/about.component';
import { UbicacionesComponent } from './components/ubicaciones/ubicaciones.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'create', component: CrearSandwichComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: CrearSandwichComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'order-history', component: OrderHistoryComponent },
    { path: 'about', component: AboutComponent},
    { path: 'locations', component: UbicacionesComponent},
    { path: 'registro', component: RegistroComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
