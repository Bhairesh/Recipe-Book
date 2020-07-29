import { Component } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  // template: '<div class="lds-circle"><div></div></div>',// coin twister
  template: '<div class="lds-ripple"><div></div><div></div></div>', // spinner growing
  styleUrls: ["./loading-spinner.component.css"],
})
export class LoadingSpinnerComponent {}
