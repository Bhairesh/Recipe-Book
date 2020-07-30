import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  // loadSelectedFeature: string = 'recipe';
  // // Header Navigation
  // onNavigate(featureSelected: string) {
  //   this.loadSelectedFeature = featureSelected;
  // }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
