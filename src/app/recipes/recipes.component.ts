import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  @Input() selectedRecipeDetails: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipeDetails = recipe;
    });
  }

}
