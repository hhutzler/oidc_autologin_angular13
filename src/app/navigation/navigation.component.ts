import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('NavigationComponent::ngOnInitauthenticated: ', isAuthenticated);
    });
  }

  login2(configId: string) {
    this.oidcSecurityService.authorize(configId);
  }

  login() {
    console.log('NavigationComponent::login() ');
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('NavigationComponent::logout() ');
    // In case you have problems  logoffAndRevokeTokens() - try this
    // this.oidcSecurityService.logoff();
    this.oidcSecurityService.logoffAndRevokeTokens()
      .subscribe((result) => console.log('NavigationComponent::logout()->result) :', result));
  }
}
