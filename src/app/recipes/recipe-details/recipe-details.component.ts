import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
// import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  selectedRecipeDeails: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.selectedRecipeDeails = this.recipeService.getRecipe(id);
      }
    );
  }

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.selectedRecipeDeails.ingredients);
  }

}
