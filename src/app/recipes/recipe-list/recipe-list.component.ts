import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() selectedRecipeDetail = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Ratatouile', 'Ratatouille is a French Provençal stewed vegetable dish, originating in Nice, and sometimes referred to as ratatouille niçoise.', 'assets/images/recipe-1.jpg'),
    new Recipe('ABC', 'asdasdassasdasomaed fdesasvcriptom', 'assets/images/recipe-1.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipeDetail.emit(recipe);
  }

}
