import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthResponseData } from "../services/auth.service";
import { AuthService } from "../services/auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertBoxComponent } from "../shared/alert-box/alert-box.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: any = null;

  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      returnSecureToken: new FormControl(true),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null),
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
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
          this.showErrorAlert(errMsg);
        }
      );
    }
    // this.loginForm.reset();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertBoxComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  forgotPassword() {}
}
