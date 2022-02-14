import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        postLoginRoute: 'home',
        forbiddenRoute: '/forbidden',
        unauthorizedRoute: '/unauthorized',
        logLevel: LogLevel.Debug,
           // Do not change historyCleanupOff to true : https://github.com/damienbod/angular-auth-oidc-client/issues/1318
        historyCleanupOff: false,
        // authority: 'https://kube-master.informatik.fh-nuernberg.de:8087/auth/realms/rzldap',
        authority: 'http://localhost:8280/auth/realms/RBAC',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular-frontend',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        // added parameters
        renewTimeBeforeTokenExpiresInSeconds: 10,
        // startCheckSession: true,
        ignoreNonceAfterRefresh: true,
        // routes that get added a bearer token by  HTTP_INTERCEPTORS provided by angular-auth-oidc-client'
        secureRoutes: ['http://localhost:8080']
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
