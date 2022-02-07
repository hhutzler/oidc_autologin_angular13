# OidcAutologin

This project was generated with
- [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.
- The new client library angular-auth-oidc-client  11.6.1 is used
- This sample is based on autlogin sample from https://github.com/damienbod/angular-auth-oidc-client
- This library contains fixes for Bugs
  - https://github.com/damienbod/angular-auth-oidc-client/issues/973
  - https://github.com/damienbod/angular-auth-oidc-client/pull/987
  
- For details read:  https://team.informatik.fh-nuernberg.de/confluence/display/OIDC/Autologin+sample+for+angular-auth-oidc-client 


## Prerequisites ( works only if running at TH Nürnberg VPN)

To runs this code you need a ready configured keycloak server up and  running.
If connected to TH Nürnberg VPN you can start a keycloak server connecting to the local LPAP server by:
- docker run -p 8087:8080 harbor.informatik.fh-nuernberg.de/hutzler/ldapdemo

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
