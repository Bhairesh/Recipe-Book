import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthResponseData } from "../services/auth.service";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      returnSecureToken: new FormControl(true),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.isLoading = true;
      let userInfo = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      let authObs = new Observable<AuthResponseData>();

      if (this.isLoginMode) {
        authObs = this.authService.login(
          userInfo,
          this.loginForm.value.returnSecureToken
        );
      } else {
        authObs = this.authService.register(userInfo);
      }

      authObs.subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(["/recipes"]);
        },
        (errMsg) => {
          this.isLoading = false;
          this.error = errMsg;
        }
      );
    }
    // this.loginForm.reset();
  }

  forgotPassword() {}
}
