import { EventEmitter } from '@angular/core';
import { Recipe } from './recipes.model';

export class RecipeService {

    selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Ratatouile', 'Ratatouille is a French Provençal stewed vegetable dish, originating in Nice, and sometimes referred to as ratatouille niçoise.', 'assets/images/recipe-1.jpg'),
        new Recipe('Shakshuka', 'Shakshuka is an easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa. It’s a simple combination of simmering tomatoes, onions, garlic, spices and gently poached eggs. It’s nourishing, filling and one recipe I guarantee you’ll make time and again.', 'assets/images/recipe-2.jpg'),
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}