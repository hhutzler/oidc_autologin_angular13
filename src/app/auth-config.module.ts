import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        postLoginRoute: '/home',
        forbiddenRoute: '/forbidden',
        unauthorizedRoute: '/unauthorized',
        logLevel: LogLevel.Debug,
        historyCleanupOff: true,
        authority: 'https://kube-master.informatik.fh-nuernberg.de:8087/auth/realms/rzldap',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'rzldap-cli',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        // added parameters
        renewTimeBeforeTokenExpiresInSeconds: 10,
        // startCheckSession: true,
        ignoreNonceAfterRefresh: true,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
