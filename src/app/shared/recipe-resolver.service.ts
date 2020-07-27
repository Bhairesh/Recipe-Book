import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Recipe } from "../recipes/recipes.model";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "./data-storage.service";

@Injectable({
  providedIn: "root",
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipes: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let recipes = this.recipes.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchData();
    }
  }
}
