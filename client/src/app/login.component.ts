import { Component } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {AngularFire, FirebaseAuthState, AuthProviders, AuthMethods, FirebaseAuth} from 'angularfire2';
import 'rxjs/Rx';

@Component({
  selector: 'custom-login',
  template: `
<form role="form">
  <div class="form-group">
    <label for="email">Email address:</label>
    <input [(ngModel)]="email" type="email" class="form-control" id="email">
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input [(ngModel)]="password" type="password" class="form-control" id="pwd">
  </div>
  <button (click)="doLogin()" type="submit" class="btn btn-default">Submit</button>
</form>

<div *ngIf="showWaiting">
  <div class="alert alert-info">
    <strong>Please wait ..</strong>
  </div>
</div>

<div *ngIf="showSuccess">
  <div class="alert alert-success">
    <strong>Success!</strong>
    <p>
    {{ authState | json }}
    </p>
  </div>
</div>
    `
})
export class LoginComponent {

  email: string;
  password: string;
  showSuccess: boolean;
  showWaiting: boolean;
  authState: FirebaseAuthState;

  constructor(
    private http: Http,
    private af: AngularFire,
    private fbAuth: FirebaseAuth) {

    this.showSuccess = false;
    this.showWaiting = false;

    this.af.auth.subscribe((auth: FirebaseAuthState) => {
      console.log(auth);
      this.showSuccess = true;
      this.showWaiting = false;
      this.authState = auth;
    });
  }

  isUndefinedOrEmpty(value: string) {
    return value === undefined || value === '';
  }

  doLogin() {

    this.showSuccess = false;
    this.showWaiting = true;

    if (this.isUndefinedOrEmpty(this.email) || this.isUndefinedOrEmpty(this.password)) {
      alert('Please provide the email & password');
      return;
    }

    const body = {
      username: this.email,
      password: this.password
    };

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/login',
      JSON.stringify(body),
      { headers: headers })
      .toPromise()
      .then(response => response.json())
      .then(data => {
        console.log(data.token);

        // this call is giving
        // Cannot read property 'providerId' of undefined
        this.fbAuth.login(data.token, {
          provider: AuthProviders.Custom,
          method: AuthMethods.CustomToken
        });
      });
  }
}
