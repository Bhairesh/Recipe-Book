import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadSelectedFeature: string = 'recipe';

  // Header Navigation 
  onNavigate(featureSelected: string) {
    this.loadSelectedFeature = featureSelected;
  }

}
