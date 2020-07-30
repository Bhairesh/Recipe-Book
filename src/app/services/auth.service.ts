import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string; //	A Firebase Auth ID token for the newly created user.
  email: string; //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //	The number of seconds in which the ID token expires.
  localId: string; //	The uid of the newly created user.
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(userInfo: any) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        userInfo
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(userInfo: any, returnSecureToken: boolean) {
    userInfo["returnSecureToken"] = returnSecureToken;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        userInfo,
        {
          headers: new HttpHeaders("Content-Type: application/json"),
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    let userData: {
      email: string;
      id: string;
      _token: string;
      _expiresIn: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expiresIn)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._expiresIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    let expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    let user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  handleError(errRes: HttpErrorResponse) {
    let errMessage: string;
    if (!errRes.error || !errRes.error.error) {
      return throwError(errMessage);
    }

    switch (errRes.error.error.message) {
      case "EMAIL_EXISTS":
        errMessage =
          "The email address is already in use by another account !!";
        break;
      case "OPERATION_NOT_ALLOWED":
        errMessage = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errMessage =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errMessage =
          "Email not found / There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errMessage =
          "The password is invalid or the user does not have a password.";
        break;
      default:
        errMessage = "An unknown error occured!!";
    }

    return throwError(errMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearInterval(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  changePassword() {
    // https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]
  }
}
