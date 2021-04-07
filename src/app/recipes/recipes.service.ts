import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { FileUpload } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // lastRecipeId: number = 0;
  // recipes: any;
  recipesObservable: Observable<any[]>;
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.recipesObservable = db.list('/recipes', ref => ref.orderByChild('id')).valueChanges(); // change order of the list by recipe id
    // this.recipesObservable.subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     this.recipes = res;
    //     this.lastRecipeId = res[res.length - 1].id;
    //   }
    // )
    // console.log(storage.ref('/recipeImages/fish.jpg').getDownloadURL());
    // storage.ref('/recipeImages/fish.jpg').getDownloadURL().subscribe(url => {
    //   console.log(url);
    // });
  }

  addRecipe(data: any) {
    this.db.list('/recipes').push(data);
  }

}

