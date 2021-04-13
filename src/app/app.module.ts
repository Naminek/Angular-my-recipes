import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AddRecipeComponent } from './manage/add-recipe/add-recipe.component';
import { AppComponent } from './app.component';
import { CategoriesFilterComponent } from './recipes/categories-filter/categories-filter.component';
import { DefaultTooltipOptions } from './default-tooltip-options';
import { environment } from 'src/environments/environment';
import { FilterPipe } from './filter.pipe';
import { HeaderComponent } from './header/header.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientsFilterComponent } from './recipes/ingredients-filter/ingredients-filter.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SwitchButtonComponent } from './input/switch-button/switch-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    CategoriesFilterComponent,
    FilterPipe,
    HeaderComponent,
    IngredientsComponent,
    IngredientsFilterComponent,
    RecipeListComponent,
    RecipesComponent,
    SwitchButtonComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(DefaultTooltipOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
