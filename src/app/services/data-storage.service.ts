import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  baseUrl: string = "https://recipe-book-f6da6.firebaseio.com/recipes.json";

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
