import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientChangedSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(){
    this.ingredientChangedSubscription.unsubscribe();
  }

  onNewIngredientAdded(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
  }

  onRemoveIngredient(ingredient: Ingredient) {
    // this.ingredients.splice(this.ingredients.indexOf(ingredient));
  }

}
