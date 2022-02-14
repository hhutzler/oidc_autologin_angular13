import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth-config.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { MessagesComponent } from './messages/messages.component';
// import {AppHttpInterceptor} from './AppHttpInterceptor';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, AuthConfigModule, HttpClientModule,],
  declarations: [AppComponent, ForbiddenComponent, HomeComponent, NavigationComponent, UnauthorizedComponent, MessagesComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
