import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  recipeEditForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.recipe = this.recipeService.getRecipe(this.id);
        this.initForm();
        console.log(this.id, this.recipe, this.editMode);
      }
    );
  }

  private initForm() {

    let recipeName = "", imagePath = "",
      recipeDescription = "", recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeEditForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(imagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });
  }

  getListOfIngredients() {
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  onAddNewIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onEditFormSubmit() {
    // console.log(this.recipeEditForm);

    // const newRecipe = new Recipe(
    //   this.recipeEditForm.value['name'],
    //   this.recipeEditForm.value['description'],
    //   this.recipeEditForm.value['imagePath'],
    //   this.recipeEditForm.value['ingredients']
    // );
    // console.log(newRecipe);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }


}
