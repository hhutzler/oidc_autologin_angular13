import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  userData$: Observable<UserDataResult>;
  private subscriptions = new Subscription();
  isAuthenticated = false;
  email = null;
  email2 = null;
  configId = null;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit()  {
    /*  this.subscriptions.add not needed here as we use async in html template. See
        https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
     */
    this.subscriptions.add(this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated,
                                                           allConfigsAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
      allConfigsAuthenticated.forEach((configItem) => {
        console.warn('--- ConfigId: ', configItem.configId);
        });
      })
    );

    this.subscriptions.add(this.oidcSecurityService.userData$.subscribe((userDataResult) => {
      console.log('userDataResult::');
        /* Check for null and undefined  or main object and nested userData objects
        *  There are two different userdata objects holding the same data.
        *  Not sure why we have duplicate data here
        *  - userDataResult.userData                -> Singe Object
        *  - userDataResult.allUserData[0].userData  -> Array of Objects
        *
        * During Logoff this the userData Objects are set to null !
        */
      if ( userDataResult != null ) {
        if ( userDataResult.allUserData[0].userData != null ) {
          this.configId = userDataResult.allUserData[0].configId;
          this.email = userDataResult.allUserData[0].userData.email;
          console.log('userDataResult.allUserData[0].configId       : ', this.configId);
          console.log('userDataResult.allUserData[0].userData.email : ', this.email);
        }
        if ( userDataResult.userData != null ) {
          // could get email also from userData Object
          this.email2 = userDataResult.userData.email;
          console.log('Alternative Data via userDataResult.userData.email : ', this.email2);
        }
      }

      })
    );

    this.userData$ = this.oidcSecurityService.userData$;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
