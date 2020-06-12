import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: ':id', component: RecipeDetailsComponent }
        ]
    },
    {
        path: 'shopping-list', component: ShoppingListComponent,
        children: [
            { path: ':id', component: ShoppingListEditComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }