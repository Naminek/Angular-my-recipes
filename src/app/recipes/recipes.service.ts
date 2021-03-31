import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { FileUpload } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Observable<any[]>;
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.recipes = db.list('/recipes').valueChanges();
  }

}

