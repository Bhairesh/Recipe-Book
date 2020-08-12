import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertBoxComponent } from "./alert-box/alert-box.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";

@NgModule({
  declarations: [
    AlertBoxComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertBoxComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [AlertBoxComponent],
})
export class SharedModule {}
