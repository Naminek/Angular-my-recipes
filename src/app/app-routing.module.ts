import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeComponent } from './manage/add-recipe/add-recipe.component';
import { CategoriesFilterComponent } from './recipes/categories-filter/categories-filter.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientsFilterComponent } from './recipes/ingredients-filter/ingredients-filter.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';


const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', redirectTo: 'categories-filter', pathMatch: 'full' },
    { path: 'categories-filter', component: CategoriesFilterComponent },
    { path: 'ingredients-filter', component: IngredientsFilterComponent },
    { path: 'recipe-list/:id', component: RecipeListComponent },
  ]},
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'add-recipe', component: AddRecipeComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
