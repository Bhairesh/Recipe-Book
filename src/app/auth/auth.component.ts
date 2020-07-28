import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

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

  constructor(private authService: AuthService) {}

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
    console.log(this.loginForm);
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.isLoading = true;
      if (this.isLoginMode) {
      } else {
        this.authService.register(this.loginForm.value).subscribe(
          (res) => {
            console.log(res);
            this.isLoading = false;
          },
          (errMsg) => {
            this.isLoading = false;
            this.error = errMsg;
            console.log(errMsg);
          }
        );
      }
    }
    this.loginForm.reset();
  }
}
