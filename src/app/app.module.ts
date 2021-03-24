import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AddRecipeComponent } from './manage/add-recipe/add-recipe.component';
import { AppComponent } from './app.component';
import { CategoriesFilterComponent } from './recipes/categories-filter/categories-filter.component';
import { HeaderComponent } from './header/header.component';
import { IngredientsFilterComponent } from './recipes/ingredients-filter/ingredients-filter.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SwitchButtonComponent } from './input/switch-button/switch-button.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    CategoriesFilterComponent,
    HeaderComponent,
    IngredientsFilterComponent,
    RecipesComponent,
    SwitchButtonComponent,
    IngredientsComponent,
    RecipeListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
