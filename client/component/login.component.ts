import { Component } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'login',
  viewProviders: [HTTP_PROVIDERS]
  template: `
    <h1>Login</h1>
    <button (click)="onLogin()">Login</button>
   `
})

export class LoginComponent {
  constructor(http: Http) {
    onLogin() {
      http.get('http://localhost:8000/api/users/login')
        .subscribe((data) => {
          console.log(data);
        })
    }
  }
}