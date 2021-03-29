import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.recipes = db.list('/recipes').valueChanges();
  }
}
