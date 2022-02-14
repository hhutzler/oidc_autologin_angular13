import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AutoLoginAllRoutesGuard] },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule),
    canLoad: [AutoLoginAllRoutesGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
