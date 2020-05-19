import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Mango', 15),
    new Ingredient('Oranges', 45),
  ];

  constructor() { }

  ngOnInit() {

  }

  onNewIngredientAdded(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
  }

  onRemoveIngredient(ingredient: Ingredient) {
    // this.ingredients.splice(this.ingredients.indexOf(ingredient));
  }

}
