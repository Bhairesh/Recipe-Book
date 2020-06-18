import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Mango', 15),
        new Ingredient('Oranges', 45),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ingredients.forEach((ingredient) => {
        //     this.addIngredient(ingredient);
        // });

        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    onRemoveIngredient() {
        // this.removeIngredient.emit();
    }
}