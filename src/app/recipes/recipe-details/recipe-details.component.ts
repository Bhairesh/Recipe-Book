import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() selectedRecipeDeails: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  addToShoppingList() {
    // console.log(this.selectedRecipeDeails);
    this.recipeService.addIngredientToShoppingList(this.selectedRecipeDeails.ingredients);
  }

}
