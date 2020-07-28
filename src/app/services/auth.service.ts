import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
  idToken: string; //	A Firebase Auth ID token for the newly created user.
  email: string; //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //	The number of seconds in which the ID token expires.
  localId: string; //	The uid of the newly created user.
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userInfo: any) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARRSFw5SIt7dCQLe15mnDnUJbpos3-MIE",
        userInfo
      )
      .pipe(
        catchError((errRes) => {
          let errMessage;
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
            default:
              errMessage = "An unknown error occured!!";
          }

          return throwError(errMessage);
        })
      );
  }
}
