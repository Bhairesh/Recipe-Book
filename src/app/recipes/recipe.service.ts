import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('Ratatouile',
            'Ratatouille is a French Provençal stewed vegetable dish, originating in Nice, and sometimes referred to as ratatouille niçoise.',
            'assets/images/recipe-1.jpg',
            [
                new Ingredient('eggplant', 2),
                new Ingredient('zucchini', 2),
                new Ingredient('tomato', 2),
            ]),
        new Recipe('Shakshuka',
            'Shakshuka is an easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa. It’s a simple combination of simmering tomatoes, onions, garlic, spices and gently poached eggs. It’s nourishing, filling and one recipe I guarantee you’ll make time and again.',
            'assets/images/recipe-2.jpg',
            [
                new Ingredient('eggs', 2),
                new Ingredient('sauce', 1),
                new Ingredient('tomato', 3),
            ]),
        new Recipe('Vanilla Mug Cake',
            'Vanilla makes everything tastes to much better, isn’t it? Add some of it to coffee, muffins or cakes, and the flavour just reaches a whole new level. But it is a hero flavour with a beautiful fragrance that stands out on it own. So if you too, like us, are a vanilla fan, this is just the recipe for you. Give this vanilla mug cake a shot today (you can thank us later!).',
            'assets/images/recipe-3.jpg',
            [
                new Ingredient('Melted butter', 2),
                new Ingredient('Milk', 1),
                new Ingredient('Vanilla extract', 0.5),
                new Ingredient('Egg yolk', 1),
                new Ingredient('Sugar', 2),
                new Ingredient('maida', 4),
                new Ingredient('Baking powder', 1)
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

}