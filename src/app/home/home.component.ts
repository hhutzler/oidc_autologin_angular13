import {Component, OnInit, OnDestroy, Injectable} from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import {Observable, Subscription} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MessageService} from "../message.service";
import {AccountService} from "../account.service";

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
  username = null;
  logHeader= "";

  constructor(public oidcSecurityService: OidcSecurityService,
              private http: HttpClient,
              public accountService: AccountService,
              public messageService: MessageService ) {}

  ngOnInit()  {
    this.logHeader = "HomeComponent:ngOnInit():";
    this.messageService.add(this.logHeader + 'Initial call to isAuthenticated: ' + this.isAuthenticated );
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
    this.messageService.add(this.logHeader + 'isAuthenticated inside Authenticated$ subscription: ' + this.isAuthenticated );
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
      if (userDataResult != null) {
        if (userDataResult.allUserData[0].userData != null) {
            // ...
          this.configId = userDataResult.allUserData[0].configId;
          this.username = userDataResult.allUserData[0].userData.preferred_username;
          this.email = userDataResult.allUserData[0].userData.email;
          console.log('userDataResult.allUserData[0].configId       : ', this.configId);
          console.log('userDataResult.allUserData[0].userData.email : ', this.email);
        }
/*
        if ( userDataResult.userData != null ) {
          // could get email also from userData Object
          this.email2 = userDataResult.userData.email;
          console.log('Alternative Data via userDataResult.userData.email : ', this.email2);
        }
        const token = this.oidcSecurityService.getAccessToken();
        console.log(" ngOnInit()::token:  " + token);
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        };
*/
        this.accountService.getAccounts();
/*
        this.http.get<any>('http://localhost:8080/accounts').subscribe(data => {
          console.log('Got Data: ' + data);
          for ( let key in data) {
            if (data.hasOwnProperty (key )) {
              this.messageService.add(this.logHeader + 'Rest Message: ' + data[key]);
              console.log('---- Key: ' + key + ' --- Data: ' + data[key]);
            }
          }
        });

 */
      }
    }));


    this.userData$ = this.oidcSecurityService.userData$;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
