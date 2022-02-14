import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, of, tap, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public messageService: MessageService,
              private http: HttpClient) { }
  private logHeader = ''
  private apiURL = 'http://localhost:8080';
  /*
  getAccounts() {
    this.logHeader = 'AccountService:getAccounts():';
    this.messageService.add(this.logHeader + 'Retrieving all Accounts' );

    this.http.get<any>('http://localhost:8080/accounts').subscribe(data => {
      console.log('Got Data: ' + data);
      for ( let key in data) {
        if (data.hasOwnProperty (key )) {
          this.messageService.add(this.logHeader + 'Rest Message: ' + data[key]);
          console.log('---- Key: ' + key + ' --- Data: ' + data[key]);
        }
      }
    });
  }
  */

  getAccounts() {
    this.logHeader = 'AccountService:getAccounts()';
    this.messageService.add(this.logHeader + 'Getting all Accounts');
    this.getAccountsREST()
        .subscribe(data=> {
          this.messageService.add('Retrieving all Accouts');
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              this.messageService.add(this.logHeader + data[key]);
              console.log('---- Key: ' + key + ' --- Data: ' + data[key]);
            }
          }
        });

  }
  getAccountsREST(): Observable<any> {
    let appUrl = this.apiURL + '/accounts'
    return this.http.get<any>(appUrl ).pipe(
        tap((data:any) => this.messageService.add('REST: Retrievnga all Accounts')),
        // catchError takes in an input Observable, and outputs an Output Observable.
        catchError(this.handleError('getAccountsREST'))
    );
  }

  addAccount() {
    this.logHeader = 'AccountService:addAccount():';
    this.messageService.add(this.logHeader + 'Adding an Accounts');
    this.addAccountREST()
        .subscribe(data=> {
              this.messageService.add('Account Added');
              for (let key in data) {
                if (data.hasOwnProperty(key)) {
                  this.messageService.add(this.logHeader + data[key]);
                  console.log('---- Key: ' + key + ' --- Data: ' + data[key]);
                }
              }
            });

  }
  addAccountREST(): Observable<any> {
    let appUrl = this.apiURL + '/accounts'
    return this.http.post<any>(appUrl,{title: 'Angular POST Request Example'} ).pipe(
        tap((data:any) => this.messageService.add('REST: Account added ')),
          // catchError takes in an input Observable, and outputs an Output Observable.
        catchError(this.handleError('addAccount'))
    );
  }

  /*
    *
    * Handle Http operation that failed and log some data
    * Stop processing by rethrowing the original error
  *
  * @param operation - name of the operation that failed
  */
  handleError(operation = 'operation' ) {

    return (error: any ) => {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status} --- Message: ${error.message}`;
      }
      this.messageService.add(`ERROR: ${operation} failed: ${errorMessage}`);
      //  rethrow the error caught by catchError - need to return an observable
      return throwError(() => error);
    }
  }

}
