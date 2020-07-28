import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  baseUrl: string = "https://recipe-book-f6da6.firebaseio.com/recipes.json";

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveData() {
    let recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe((res) => {
      //   console.log(res);
    });
  }

  fetchData() {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((res) => {
        this.recipeService.setRecipes(res);
      })
    );
  }
}
